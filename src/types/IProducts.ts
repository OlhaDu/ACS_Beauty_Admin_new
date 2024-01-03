export interface ProductElem {
    BrandId: number;
    SubcategoryId: number;
    count: null;
    description: string;
    discount: string;
    hit: boolean;
    id: number;
    name: string;
    novelty: boolean;
    price: string;
  }
  
export interface ProductsResponse {
    count: number;
    products: ProductElem[];
  }