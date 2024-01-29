import { configureStore } from "@reduxjs/toolkit"
import categories from "./slices/categoriesSlice"
import { TypedUseSelectorHook, useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { brands } from "./brands/slice"
import { news } from "./news/slice"

export const store = configureStore({
  reducer: { categories, brands, news },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
