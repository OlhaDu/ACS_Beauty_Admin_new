import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { ISlide } from "src/api/slides/types"
import { ISlide } from "src/types/slides"
import { getSlides, createNewSlide, deleteSlide, patchSlide } from "./operations"

export interface SlidesState {
  count: number
  slides: ISlide[]
  isLoading: boolean
  error: unknown | null
}

const initialState: SlidesState = {
  count: 0,
  slides: [],
  isLoading: false,
  error: null,
}

const slidesSlice = createSlice({
  name: "slides",
  initialState,

  reducers: {
    addSlide: (state, action: PayloadAction<ISlide>) => {
      state.slides.push(action.payload)
      state.count += 1
    },

    updateSlide: (state, action: PayloadAction<ISlide>) => {
      const updatedSlide = action.payload
      const index = state.slides.findIndex(slide => slide.id === updatedSlide.id)

      if (index === -1) return
      state.slides[index] = updatedSlide
    },

    deleteSlide: (state, action) => {
      state.slides = state.slides.filter(slide => slide.id !== action.payload.id)
      state.count -= 1
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getSlides.pending, handlePending)
      .addCase(getSlides.fulfilled, (state, action) => {
        state.count = action.payload.count
        state.slides = action.payload.rows
        state.isLoading = false
        state.error = null
      })
      .addCase(getSlides.rejected, handleRejected)

      .addCase(createNewSlide.pending, handlePending)
      .addCase(createNewSlide.fulfilled, (state, action) => {
        slidesSlice.caseReducers.addSlide(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(createNewSlide.rejected, handleRejected)

      .addCase(patchSlide.pending, handlePending)
      .addCase(patchSlide.fulfilled, (state, action) => {
        slidesSlice.caseReducers.updateSlide(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(patchSlide.rejected, handleRejected)

      .addCase(deleteSlide.pending, handlePending)
      .addCase(deleteSlide.fulfilled, (state, action) => {
        slidesSlice.caseReducers.deleteSlide(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(deleteSlide.rejected, handleRejected)
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

export const slidesReducer = slidesSlice.reducer
