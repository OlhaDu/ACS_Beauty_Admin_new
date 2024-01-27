// import { instance } from "../instance"
import { GridRowId } from "@mui/x-data-grid"
// import { INews, IResponse } from "src/types/news"
import { temporaryData } from "./temporaryData"
import foto from "../../images/photo/no_image.png"

export const newsApi = {
  // <---------- get ---------->
  getNews({ page = 1, pageSize = 10, lookup = "" }) {
    // return instance.get<IResponse>(
    //   `news?page=${page}&pageSize=${pageSize}${lookup ? `&lookup=${lookup}` : ""}`
    // )
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize

    const filteredData = temporaryData[0].rows
      .filter(item => item.title.toLowerCase().includes(lookup.toLowerCase()))
      .slice(startIndex, endIndex)

    return Promise.resolve({
      data: {
        count: temporaryData[0].rows.length,
        rows: filteredData,
      },
    })
  },

  // <---------- post ---------->
  postNews(formData: FormData) {
    // return instance.post<INews>("news/", formData)
    const newNewsData = {
      id: Math.floor(Math.random() * 1000),
      banner: `${foto}`,
      title: formData.get("title"),
      createdAt: new Date().toISOString(),
      description: formData.get("description"),
    }

    return Promise.resolve({ data: newNewsData })
  },

  // <---------- patch ---------->
  patchNews(id: GridRowId, formData: FormData) {
    // return instance.patch<INews>(`news/${id}`, formData)

    const updateNewsData = {
      id: id,
      banner: `${foto}`,
      title: formData.get("title"),
      createdAt: new Date().toISOString(),
      description: formData.get("description"),
    }

    const currentNewsIndex = temporaryData[0].rows.findIndex(news => news.id === id)

    temporaryData[0].rows.splice(currentNewsIndex, 1, updateNewsData)

    return currentNewsIndex !== -1
      ? Promise.resolve({ data: updateNewsData })
      : Promise.reject(`News with id ${id} not found`)
  },

  // <---------- delete ---------->
  deleteNews(id: GridRowId) {
    // return instance.delete(`news/${id}`)
    temporaryData[0].rows.filter(news => news.id !== id)
    return Promise.resolve({ id })
  },
}
