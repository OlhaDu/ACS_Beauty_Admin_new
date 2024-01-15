import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { RootState } from "src/redux/store";
import ToolsPanel from "src/components/ToolsPanel/ToolsPanel";
import { ProductElem } from "src/types";
import { GridColDef, GridRowSelectionModel, GridPaginationModel } from '@mui/x-data-grid';
import { Typography } from "@mui/material";
import { ProductNewProductButton, ProductTable, SubHeaderProduct, ProductsWallpaper, ProductsTable, ButtonActions, ProductsHeader } from "./ProductsTheme";
import { getProductsAsync } from "src/redux/slices/productsSlice";
import { http } from "src/api";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Products = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const productsArray: ProductElem[] = useSelector(
		(state: RootState) => (state.products.products || []) as ProductElem[],
	);
  const rowCountState = useSelector(
		(state: RootState) => (state.products.count),
	);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const handlePageSizeChange = (newPageSize: GridPaginationModel) => {
    setPaginationModel({
      pageSize: newPageSize.pageSize,
      page: newPageSize.page,
    });
  };  
  
  const [rowSelectionModel, setRowSelectionModel] =
  React.useState<GridRowSelectionModel>([]);

  const authToken = import.meta.env.VITE_API_BASE_TOKEN;

  const handleButtonDelete = async (id: number) => {
    console.log("Delete:", id);
    try {
        const response = await http.delete(`/api/product/${id}`, {
        headers: {
          Authorization: authToken,
        },
      });
      if (response.status === 204) {
        console.log("Deleted");
      } else {
        console.error('Failed to delete product:', response);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  const handleButtonEdit = async (id: number) => {
    console.log("Edit:", id);
  };
  
  useEffect(() => {
    dispatch(getProductsAsync({
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
    }));
  }, [paginationModel.page]);
  

  const getSelectedItemsText = (count: number) => {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;
  
    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${count.toLocaleString()} товар вибраний`;
    } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
      return `${count.toLocaleString()} товари вибрані`;
    } else {
      return `${count.toLocaleString()} товарів вибрані`;
    }
  };

  const customLocaleText = {
    footerRowSelected: (count: number): string => getSelectedItemsText(count),
    MuiTablePagination: {
      labelDisplayedRows: ({
        from,
        to,
        count,
      }: {
        from: number;
        to: number;
        count: number;
      }): string => `${from} - ${to} з ${count}`,
    },
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'img', headerName: 'Фото товару', width: 120 },
    { field: 'name', headerName: 'Назва товару', width: 300 },
    { field: 'category', headerName: 'Категорія', width: 120 },
    { field: 'price', headerName: 'Ціна', width: 110, valueFormatter: (params) => `${parseInt(params.value as string).toLocaleString('ua-UA')} грн.` },
    { field: 'display', headerName: 'Відображення', width: 140 },
    { field: 'createdAt', headerName: 'Створено', width: 140, valueFormatter: (params) => new Date(params.value as string).toLocaleDateString() },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <ButtonActions icon={<EditIcon />} label="Edit" onClick={() => handleButtonEdit(params.row.id)}/>,
        <ButtonActions icon={<DeleteIcon />} label="Delete" onClick={() => handleButtonDelete(params.row.id)}/>,
      ],
    }
  ];


  return (
    <ProductsWallpaper>
      <ProductsHeader>
        <SubHeaderProduct>
          <Typography variant="h3">Товари</Typography>
          <ProductNewProductButton>СТВОРИТИ НОВИЙ</ProductNewProductButton>
        </SubHeaderProduct>
        <ToolsPanel />
      </ProductsHeader>
      <ProductTable>
      {productsArray && productsArray.length > 0 ? (
          <ProductsTable
            rows={productsArray}
            rowCount={rowCountState}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={(newPageSize) => handlePageSizeChange(newPageSize)}
            rowHeight={106}
            pageSizeOptions={[10, 25, 50, 100]}
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
            disableColumnMenu={true}
            paginationMode="server"
            localeText={customLocaleText}
          />
        ) : (
          <div>Oops!</div>
        )}
      </ProductTable>
    </ProductsWallpaper>
  );
};

export default Products;
