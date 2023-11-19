import { request } from "graphql-request";
import { GET_PRODUCTS } from "./gql";

import { ProductsData } from "../../types";

export default async function fetchProducts(): Promise<ProductsData> {
  return await request({
    url: "https://cpb-new-developer.myshopify.com/admin/api/2023-10/graphql.json",
    requestHeaders: {
      "content-type": "application/json",
      "X-Shopify-Access-Token": process.env.ACCESS_TOKEN,
    },
    document: GET_PRODUCTS,
  });
}
