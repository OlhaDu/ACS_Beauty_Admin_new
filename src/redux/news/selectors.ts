import { INovelty } from "src/types/news"

export const selectIsLoading = (state: { news: { isLoading: boolean } }) => state.news.isLoading

export const selectIsError = (state: { news: { error: unknown | null } }) => state.news.error

export const selectNews = (state: { news: { news: INovelty[] } }) => state.news.news

export const selectCount = (state: { news: { count: number } }) => state.news.count
