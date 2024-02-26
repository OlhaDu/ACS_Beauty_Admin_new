import { configureStore } from "@reduxjs/toolkit"
import categories from "./slices/categoriesSlice"
import { TypedUseSelectorHook, useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { brandsReducer } from "./brands/slice"
import { reviewsReducer } from "./reviews/reviewsSlice"
import { dashboardReducer } from "./dashboards/dashboardSlice";

export const store = configureStore({
  reducer: { categories, brands: brandsReducer, reviews: reviewsReducer, dashboards: dashboardReducer },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
