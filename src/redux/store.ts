import { configureStore } from "@reduxjs/toolkit"
import categories from "./slices/categoriesSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { brandsReducer } from "./brands/slice"
import productsSlice from '../redux/slices/productsSlice';
import productActionsSlice from '../redux/slices/productActionsSlice';

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type IRootState = ReturnType<typeof store.getState>
export type IAppDispatch = typeof store.dispatch

export const store = configureStore({
	reducer: {
		categories: categories,
		products: productsSlice,
		product: productActionsSlice,
		brands: brandsReducer,
	},
});
