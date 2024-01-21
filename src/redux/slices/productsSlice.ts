import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsResponse, DispatchProduct, ProductsState} from 'src/types';
import { http } from 'src/api';

const initialState: ProductsState = {
	products: [],
  count: 20,
  page: 0,
  pageSize: 10, 
	isLoading: false,
	error: null,
};

  export const getProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async ({ page, pageSize }: DispatchProduct) => {
      try {
        const response = await http.get(`/api/product?page=${page + 1}&pageSize=${pageSize}`);
  
        if (!response.data) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
  
        const resultsRes: ProductsResponse = await response.data;
  
        return { data: { products: resultsRes.rows, count: resultsRes.count, page, pageSize } };
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
              state.page = action.meta.arg.page;
              state.pageSize = action.meta.arg.pageSize;
            } else if (error) {
              state.error = error;
            }
          });
          
	},
});

export const { reducer: productsReducer, actions } = productsSlice;

export default productsReducer;