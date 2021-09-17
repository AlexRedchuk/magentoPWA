import { gql } from '@apollo/client';

export const CategoryFragment = gql`
    fragment CategoryFragment on CategoryTree {
        id
        meta_title
        meta_keywords
        meta_description
    }
`;

export const ProductsFragment = gql`
    fragment ProductsFragment on Products {
        items {
            id
            brand
            name
            price_range {
                maximum_price {
                    regular_price {
                        currency
                        value
                    }
                }
            }
            product_brand
            sku
            small_image {
                url
            }
            stock_status
            type_id
            url_key
            url_suffix
        }
        page_info {
            total_pages
        }
        total_count
    }
`;
