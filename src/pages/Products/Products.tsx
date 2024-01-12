import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { RootState } from "src/redux/store";
import ToolsPanel from "src/components/ToolsPanel/ToolsPanel";
import { ProductElem } from "src/types";
import { DataGrid, GridColDef, GridRowSelectionModel, GridPaginationModel } from '@mui/x-data-grid';
import { Typography } from "@mui/material";
import { ProductNewProductButton, ProductTable, SubHeaderProduct, ProductsWallpaper } from "./ProductsTheme";
import { getProductsAsync } from "src/redux/slices/productsSlice";

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
  
  console.log(productsArray);

  const [rowSelectionModel, setRowSelectionModel] =
  React.useState<GridRowSelectionModel>([]);

  // const authToken = import.meta.env.VITE_API_BASE_TOKEN;

  useEffect(() => {
    dispatch(getProductsAsync({
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
    }));
  }, [paginationModel.page]);
  

  const getSelectedItemsText = (count: number) => {/*  */
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

  const addProduct = async () => {
    console.log("click");
    // try {
    //   const response = await api.post("/api/product", {
    //     name: "Hair Mask", 
    //     description: "Product description",
    //     price: 1250,
    //     discount: 5,
    //     count: 100,
    //     novelty: true,
    //     hit: false,
    //     subcategoryId: 1,
    //     brandId: 1,
    //   }, {
    //     headers: {
    //       Authorization: authToken,
    //     },
    //   });

    //   if (response.status === 200 || response.status === 201) {
    //     const updatedResponse = await api.get(`/api/product?page=${paginationModel.page + 1}&pageSize=${paginationModel.pageSize}`);
    //     const updatedProductsRes: ProductsResponse = updatedResponse.data;
    //     setProductsArray(updatedProductsRes.rows);
    //   } else {
    //     console.error('Failed to add product:', response.data);
    //   }
    // } catch (error) {
    //   console.error('Error adding product:', error);
    // }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    // { field: 'img', headerName: 'Фото товару', width: 100 },
    { field: 'name', headerName: 'Назва товару', width: 250 },
    // { field: 'category', headerName: 'Категорія', width: 100 },
    { field: 'price', headerName: 'Ціна', width: 70 },
    // { field: 'display', headerName: 'Відображення', width: 120 },
    { field: 'createdAt', headerName: 'Створено', width: 150 },
  ];


  return (
    <ProductsWallpaper>
      <SubHeaderProduct>
      <Typography variant="h3">Товари</Typography>
      <ProductNewProductButton onClick={() => addProduct()}>СТВОРИТИ НОВИЙ</ProductNewProductButton>
      </SubHeaderProduct>
      <ToolsPanel />
      <ProductTable>
      {productsArray && productsArray.length > 0 ? (
          <DataGrid
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
            localeText={{
              footerRowSelected: (count) => getSelectedItemsText(count),
                MuiTablePagination: {
                  labelDisplayedRows: ({ from, to, count }) =>
                    `${from} - ${to} з ${count}`,
                },
            }}
          />
        ) : (
          <div>Oops!</div>
        )}
      </ProductTable>
    </ProductsWallpaper>
  );
};

export default Products;
