import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { getNews, createNewNews, patchNews, deleteNews } from "./operations"
import { INovelty } from "src/types/news"

export interface NewsState {
  count: number
  news: INovelty[]
  isLoading: boolean
  error: unknown | null
}

const initialState: NewsState = {
  count: 0,
  news: [],
  isLoading: false,
  error: null,
}

const newsSlice = createSlice({
  name: "news",
  initialState,

  reducers: {
    addNews: (state, action: PayloadAction<INovelty>) => {
      state.news.push(action.payload)
      state.count += 1
    },

    updateNews: (state, action: PayloadAction<INovelty>) => {
      const updatedNews = action.payload
      const index = state.news.findIndex(news => news.id === updatedNews.id)

      if (index === -1) return
      state.news[index] = updatedNews
    },

    deleteNews: (state, action) => {
      state.news = state.news.filter(news => news.id !== action.payload.id)
      state.count -= 1
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getNews.pending, handlePending)
      .addCase(getNews.fulfilled, (state, action) => {
        state.count = action.payload.count
        state.news = action.payload.rows
        state.isLoading = false
        state.error = null
      })
      .addCase(getNews.rejected, handleRejected)

      .addCase(createNewNews.pending, handlePending)
      .addCase(createNewNews.fulfilled, (state, action) => {
        newsSlice.caseReducers.addNews(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(createNewNews.rejected, handleRejected)

      .addCase(patchNews.pending, handlePending)
      .addCase(patchNews.fulfilled, (state, action) => {
        newsSlice.caseReducers.updateNews(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(patchNews.rejected, handleRejected)

      .addCase(deleteNews.pending, handlePending)
      .addCase(deleteNews.fulfilled, (state, action) => {
        newsSlice.caseReducers.deleteNews(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(deleteNews.rejected, handleRejected)
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

export const news = newsSlice.reducer
