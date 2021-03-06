import React from 'react';
import { Link } from 'react-router-dom';

import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { useStyle } from '../../classify';
import defaultClasses from './submenuColumn.css';
import PropTypes from 'prop-types';

/**
 * The SubmenuColumn component displays columns with categories in submenu
 *
 * @param {MegaMenuCategory} props.category
 */
const SubmenuColumn = props => {
    const { category } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const categoryUrl = resourceUrl(
        `/${category.url_path}${category.url_suffix || ''}`
    );
    let children = null;

    if (category.children.length) {
        const childrenItems = category.children.map((item, index) => {
            const { url_path, url_suffix, isActive, name } = item;
            const categoryUrl = resourceUrl(`/${url_path}${url_suffix || ''}`);

            // setting keyboardProps if it is last child of that category
            const keyboardProps =
                index === category.children.length - 1
                    ? props.keyboardProps
                    : {};

            return (
                <li key={index} className={classes.submenuChildItem}>
                    <Link
                        {...keyboardProps}
                        className={isActive ? classes.linkActive : classes.link}
                        to={categoryUrl}
                    >
                        {name}
                    </Link>
                </li>
            );
        });

        children = <ul className={classes.submenuChild}>{childrenItems}</ul>;
    }

    // setting keyboardProps if category does not have any sub-category
    const keyboardProps = category.children.length ? {} : props.keyboardProps;

    return (
        <div className={classes.submenuColumn}>
            <Link {...keyboardProps} className={classes.link} to={categoryUrl}>
                <h3 className={classes.heading}>{category.name}</h3>
            </Link>
            {children}
        </div>
    );
};

export default SubmenuColumn;

SubmenuColumn.propTypes = {
    category: PropTypes.shape({
        children: PropTypes.array,
        id: PropTypes.number.isRequired,
        include_in_menu: PropTypes.number,
        isActive: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        path: PropTypes.array.isRequired,
        position: PropTypes.number.isRequired,
        url_path: PropTypes.string.isRequired,
        url_suffix: PropTypes.string
    }).isRequired
};
