import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { ProductElem, ProductsResponse } from 'src/types';
import { http } from 'src/api';

export interface ProductsState {
	products: ProductElem[] | unknown;
    count: number;
	isLoading: boolean;
	error: string | null | SerializedError;
}

interface dispatchProduct {
    page: number;
    pageSize: number;
}

const initialState: ProductsState = {
	products: [],
    count: 20,
	isLoading: false,
	error: null,
};

  export const getProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async ({ page, pageSize }: dispatchProduct) => {
      try {
        const response = await http.get(`/api/product?page=${page + 1}&pageSize=${pageSize}`);
  
        if (!response.data) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
  
        const resultsRes: ProductsResponse = await response.data;
  
        return { data: { products: resultsRes.rows, count: resultsRes.count } };
      } catch (error) {
        return { data: { error: error instanceof Error ? error.message : 'An unknown error occurred.' } };
      }
    },
  );

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
        builder.addCase(getProductsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            const { products, count, error } = action.payload.data;
            
            if (products && count) {
              const productsArray = products;     
              state.products = productsArray;        
              state.count = count;
            } else if (error) {
              state.error = error;
            }
          });
          
	},
});

export const { reducer: productsReducer, actions } = productsSlice;

export default productsReducer;