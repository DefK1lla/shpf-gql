export interface ImageNode {
  src: string;
}

export interface ImageEdge {
  node: ImageNode;
}

export interface ProductNode {
  id: string;
  title: string;
  bodyHtml: string;
  images: {
    edges: ImageEdge[];
  };
}

export interface ProductEdge {
  node: ProductNode;
}

export interface ProductsData {
  products: {
    edges: ProductEdge[];
  };
}
