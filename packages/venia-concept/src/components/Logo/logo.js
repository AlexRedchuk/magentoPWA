import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Image from "@magento/venia-ui/lib/components/Image";


/**
 * A component that renders a logo in the header.
 *
 * @typedef Logo
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a logo.
 */
const Logo = ({data}) => {
    const { base_media_url, header_logo_src, logo_alt, logo_height, logo_width  } = data;
    const { formatMessage } = useIntl();

    const title = formatMessage({ id: 'logo.title', defaultMessage: logo_alt });

    return (
        <Image
            alt={title}
            height={logo_height}
            src={`${base_media_url}logo/${header_logo_src}`}
            title={title}
            width={logo_width}
        />
    );
};

/**
 * Props for {@link Logo}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * Logo component.
 * @property {string} classes.logo classes for logo
 * @property {number} height the height of the logo.
 */
Logo.propTypes = {
    classes: PropTypes.shape({
        logo: PropTypes.string
    }),
    height: PropTypes.number,
    width: PropTypes.number
};

Logo.defaultProps = {
    height: 18,
    width: 102
};

export default Logo;
