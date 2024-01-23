import { SerializedError } from "@reduxjs/toolkit";

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
    rows: ProductElem[];
  }

export interface DispatchProduct {
  page: number;
  pageSize: number;
}

export interface ProductsState {
	products: ProductElem[] | unknown;
  count: number;
  page: number,
  pageSize: number, 
	isLoading: boolean;
	error: string | null | SerializedError;
}

export interface ProductState {
	product: ProductElem | unknown;
	isLoading: boolean;
	error: string | null | SerializedError;
}

export interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  nameProduct: string;
  id: string;
}