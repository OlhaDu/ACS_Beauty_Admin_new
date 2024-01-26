import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from 'src/api';
import { ProductState } from 'src/types/IProducts';
import { selectProducts } from '../hooks';

const initialState: ProductState = {
  product: '',
  isLoading: false,
  error: null,
};

export const deleteProductAsync = createAsyncThunk(
    'product/delete',
    async (id: number ) => {
      const authToken = import.meta.env.VITE_API_BASE_TOKEN;
  
      try {
        const response = await http.delete(`/product/${id}`, {
          headers: {
            Authorization: authToken,
          },
        });
        if (response.status === 204) {
          console.log("Deleted from Dispatch", selectProducts);
        } else {
          console.error('Failed to delete product:', response);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  );

//   export const updateProductAsync = createAsyncThunk(
//     'product/update',
//     async (updatedProduct: YourProductType) => {
//       try {
//         const response = await http.put('/product', updatedProduct, {
//           headers: {
//             Authorization: authToken,
//           },
//         });
  
//         if (response.status === 200) {
//           console.log("Product updated");
//         } else {
//           console.error('Failed to update product:', response);
//         }
//       } catch (error) {
//         console.error('Error updating product:', error);
//       }
//     });

const productActionsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteProductAsync.fulfilled, (state) => {
        state.isLoading = false;
        console.log("Product deleted successfully");
      });
  
      builder.addCase(deleteProductAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || error;
      });

    //   builder.addCase(updateProductAsync.fulfilled, (state) => {

    //     console.log("Product updated successfully");
    //   });
    //   builder.addCase(updateProductAsync.rejected, (state, { error }) => {

    //     console.error('Error updating product:', error);
    //   });
  },
});

export const { reducer: productsReducer, actions } = productActionsSlice;

export default productsReducer;
