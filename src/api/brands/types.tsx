import { GridRowId } from "@mui/x-data-grid";

export interface IGetBrandsParams {
  page?: number;
  pageSize?: number;
  lookup?: string;
}

export interface IBrand {
  id: number;
  logo: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface IResponse {
  count: number;
  rows: IBrand[];
}

export interface IDeleteBrandResponse {
  id: GridRowId;
}
