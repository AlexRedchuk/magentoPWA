import React, {Fragment, Suspense, useEffect, useRef} from 'react';
import { shape, string } from 'prop-types';
import { Link, Route } from 'react-router-dom';

import Logo from '../Logo';
import AccountTrigger from './accountTrigger';
import CartTrigger from '@magento/venia-ui/lib/components/Header/cartTrigger';
import NavTrigger from '@magento/venia-ui/lib/components/Header/navTrigger';
import SearchTrigger from '@magento/venia-ui/lib/components/Header/searchTrigger';
import OnlineIndicator from '@magento/venia-ui/lib/components/Header/onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './header.css';
import PageLoadingIndicator from '@magento/venia-ui/lib/components/PageLoadingIndicator';
import StoreSwitcher from '@magento/venia-ui/lib/components/Header/storeSwitcher';
import CurrencySwitcher from '@magento/venia-ui/lib/components/Header/currencySwitcher';
import MegaMenu from '../MegaMenu';
import { useIntl } from 'react-intl';

const SearchBar = React.lazy(() => import('@magento/venia-ui/lib/components/SearchBar'));

const Header = props => {
    const headerRef = useRef(null);
    const classes = useStyle(defaultClasses, props.classes);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (headerRef.current) {
                    headerRef.current.classList.toggle(classes.sticky, entries[0].intersectionRatio < 1);
                }
            },
            {threshold: []}
        );

        if (headerRef.current) {
            observer.observe(headerRef.current);
        }
    }, []);

    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isPageLoading,
        isSearchOpen,
        searchRef,
        searchTriggerRef,
        logoData,
        logoError,
        logoLoading
    } = useHeader();

    const { formatMessage } = useIntl();


    const rootClass = isSearchOpen ? classes.open : classes.closed;
    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );
    const searchBar = isSearchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    ) : null;
    const pageLoadingIndicator = isPageLoading ? (
        <PageLoadingIndicator />
    ) : null;

    return (
        <Fragment>
            <div className={classes.switchersContainer}>
                <div className={classes.switchers}>
                    <StoreSwitcher />
                    <CurrencySwitcher />
                </div>
            </div>
            <header ref={headerRef} className={rootClass}>
                <div className={classes.toolbar}>
                    <div className={classes.primaryActions}>
                        <NavTrigger />
                    </div>
                    {pageLoadingIndicator}
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                    <Link
                        to={resourceUrl('/')}
                        className={classes.logoContainer}
                    >
                        {
                            !logoLoading ?
                                <Fragment>
                                    {(!logoError && logoData) ? (
                                        <Logo
                                           data={logoData}
                                        />
                                    ) : (
                                        <Logo

                                            alt={formatMessage({ defaultMessage: 'Drexel', id: 'logo.title' })}
                                            classes={{logo: classes.logo, image: classes.image}}
                                            height={46}
                                            logo={'dron'}
                                            title={formatMessage({ defaultMessage: 'Drexel', id: 'logo.title' })}
                                            width={176}
                                        />
                                    )}
                                </Fragment>: null
                        }


                    </Link>
                    <MegaMenu />
                    <div className={classes.secondaryActions}>
                        <SearchTrigger
                            onClick={handleSearchTriggerClick}
                            ref={searchTriggerRef}
                        />
                        <AccountTrigger />
                        <CartTrigger />
                    </div>
                </div>
                {searchBar}
            </header>
        </Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        switchers: string,
        switchersContainer: string
    })
};

export default Header;
