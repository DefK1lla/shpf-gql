import { request } from "graphql-request";
import fetchProducts from "../src/fetchProducts";
import { GET_PRODUCTS } from "../src/gql";

jest.mock("graphql-request");

const mockRequest = request as jest.Mock;

describe("fetchProducts функция", () => {
  const mockProductsData = {
    products: {
      edges: [
        {
          node: {
            id: "mock-id",
            title: "Mock Product",
            bodyHtml: "<p>Mock Product description</p>",
            images: {
              edges: [
                {
                  node: {
                    src: "mock-image.jpg",
                  },
                },
              ],
            },
          },
        },
      ],
    },
  };

  beforeEach(() => {
    mockRequest.mockReset();
  });

  it("должна вызывать request с правильными параметрами", async () => {
    const expectedRequestOptions = {
      url: "https://cpb-new-developer.myshopify.com/admin/api/2023-10/graphql.json",
      requestHeaders: {
        "content-type": "application/json",
        "X-Shopify-Access-Token": "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",
      },
      document: GET_PRODUCTS,
    };

    mockRequest.mockResolvedValue(mockProductsData);

    const result = await fetchProducts();
    expect(request).toHaveBeenCalledWith(expectedRequestOptions);

    expect(result).toEqual(mockProductsData);
  });

  it("должна обрабатывать ошибку запроса", async () => {
    mockRequest.mockRejectedValue(new Error("GraphQL request failed"));

    await expect(fetchProducts()).rejects.toThrow("GraphQL request failed");
  });
});
