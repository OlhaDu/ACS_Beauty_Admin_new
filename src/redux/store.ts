import { configureStore } from "@reduxjs/toolkit"
import categories from "./slices/categoriesSlice"
import { TypedUseSelectorHook, useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { brandsReducer } from "./brands/slice"

export const store = configureStore({ reducer: { categories, brands: brandsReducer } })

export type IAppDispatch = typeof store.dispatch
export type IRootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => IAppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
