import { gql } from "graphql-request";

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int = 10) {
    products(first: $first) {
      edges {
        node {
          id
          title
          bodyHtml
          images(first: 1) {
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  }
`;
