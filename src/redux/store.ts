import { configureStore } from "@reduxjs/toolkit"
import categories from "./slices/categoriesSlice"

export const store = configureStore({ reducer: { categories } })

export type IRootState = ReturnType<typeof store.getState>
export type IAppDispatch = typeof store.dispatch
