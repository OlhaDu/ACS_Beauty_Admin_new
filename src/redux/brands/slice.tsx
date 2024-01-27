import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IBrand } from "src/types/brands"
import { getBrands, createNewBrand, deleteBrand, patchBrand } from "./operations"

export interface BrandsState {
  count: number
  brands: IBrand[]
  isLoading: boolean
  error: unknown | null
}

const initialState: BrandsState = {
  count: 0,
  brands: [],
  isLoading: false,
  error: null,
}

const brandsSlice = createSlice({
  name: "brands",
  initialState,

  reducers: {
    addBrand: (state, action: PayloadAction<IBrand>) => {
      state.brands.push(action.payload)
      state.count += 1
    },

    updateBrand: (state, action: PayloadAction<IBrand>) => {
      const updatedBrand = action.payload
      const index = state.brands.findIndex(brand => brand.id === updatedBrand.id)

      if (index === -1) return
      state.brands[index] = updatedBrand
    },

    deleteBrand: (state, action) => {
      state.brands = state.brands.filter(brand => brand.id !== action.payload.id)
      state.count -= 1
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getBrands.pending, handlePending)
      .addCase(getBrands.fulfilled, (state, action) => {
        state.count = action.payload.count
        state.brands = action.payload.rows
        state.isLoading = false
        state.error = null
      })
      .addCase(getBrands.rejected, handleRejected)

      .addCase(createNewBrand.pending, handlePending)
      .addCase(createNewBrand.fulfilled, (state, action) => {
        brandsSlice.caseReducers.addBrand(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(createNewBrand.rejected, handleRejected)

      .addCase(patchBrand.pending, handlePending)
      .addCase(patchBrand.fulfilled, (state, action) => {
        brandsSlice.caseReducers.updateBrand(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(patchBrand.rejected, handleRejected)

      .addCase(deleteBrand.pending, handlePending)
      .addCase(deleteBrand.fulfilled, (state, action) => {
        brandsSlice.caseReducers.deleteBrand(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(deleteBrand.rejected, handleRejected)
  },
})

function handlePending(state: { isLoading: boolean }) {
  state.isLoading = true
}

function handleRejected(
  state: { isLoading: boolean; error: unknown },
  action: { payload: unknown }
) {
  state.isLoading = false
  state.error = action.payload
}

export const brands = brandsSlice.reducer
