import { INews } from "./INews"

export interface IResponse {
  count: number
  rows: INews[]
}
