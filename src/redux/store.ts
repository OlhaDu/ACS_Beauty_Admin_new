import { configureStore } from "@reduxjs/toolkit"
import categories from "./categories/slice"
import { brandsReducer } from "./brands/slice"

export const store = configureStore({ reducer: { categories, brands: brandsReducer } })

export type IAppDispatch = typeof store.dispatch
export type IRootState = ReturnType<typeof store.getState>
