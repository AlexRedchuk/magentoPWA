import {gql} from "@apollo/client";

export const GET_STORE_LOGO = gql`
    query getStoreLogo {
     storeConfig {
         id
         base_media_url
         header_logo_src
         logo_alt
         logo_height
         logo_width
     }
 }
`;
