import { configureStore } from "@reduxjs/toolkit"
import categories from "./slices/categoriesSlice"
import productsSlice from '../redux/slices/productsSlice';
import productActionsSlice from '../redux/slices/productActionsSlice';
export type IRootState = ReturnType<typeof store.getState>
export type IAppDispatch = typeof store.dispatch

export const store = configureStore({
	reducer: {
		categories: categories,
		products: productsSlice,
		product: productActionsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;