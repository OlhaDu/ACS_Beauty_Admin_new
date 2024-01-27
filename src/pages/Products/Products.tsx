import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from "redux";
import { RootState } from "src/redux/store";
import { ProductElem } from "src/types";
import { GridColDef,
  GridRowSelectionModel,
  GridPaginationModel,
  GridPreProcessEditCellProps,
  GridToolbarExport,
  GridToolbarContainer,
  GridPrintGetRowsToExportParams,
  gridFilteredSortedRowIdsSelector,
  selectedGridRowsSelector,
  GridToolbar,
  GridToolbarFilterButton,
  GridRowId, } from '@mui/x-data-grid';
// import ExportFileIcon from "src/images/svg/ExportFileIcon";
import { Typography } from "@mui/material";
import { ProductTable, SubHeaderProduct, ProductsWallpaper, ProductsTable, ButtonActions, ProductsHeader } from "./ProductsTheme";
import { getProductsAsync } from "src/redux/slices/productsSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Badge from "src/components/Badge/Badge";
import VioletButton from "src/components/Buttons/VioletButton";
import { useAppSelector } from "src/redux/selectors";
import { selectProducts } from "src/redux/hooks";
import DeleteModal from "src/components/ProductDeleteModal/DeleteModal";

const Products = () => {
  const dispatch: ThunkDispatch<RootState, unknown, Action> = useDispatch();
  const productsArray: ProductElem[] = (useAppSelector(selectProducts) || []) as ProductElem[];
  const rowCountState = useSelector(
		(state: RootState) => (state.products.count),
	);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<{ id: number, nameProduct: string | '' }>({ id: 0, nameProduct: '' });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePageSizeChange = (newPageSize: GridPaginationModel) => {
    setPaginationModel({
      pageSize: newPageSize.pageSize,
      page: newPageSize.page,
    });
  };  
  
  const [rowSelectionModel, setRowSelectionModel] =
  React.useState<GridRowSelectionModel>([]);

  const handleButtonDelete = async (id: number, nameProduct: string) => {
    setSelectedProduct({ id, nameProduct });
    handleOpen();
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
    toolbarExport: "Експортувати",
    toolbarFilters: "Фільтрувати",
    filterPanelColumns: "Рядок",
    MuiTablePagination: {
      labelRowsPerPage:"Рядків на сторінці: ",
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

  const errorValue = (pam: GridPreProcessEditCellProps) => {
      const hasError = pam.props.value === '';
      const errorStyle = hasError ? { backgroundColor: 'red', height: '105%', padding: 0} : null;
  
      return {
        ...pam.props,
        error: hasError,
        style: errorStyle,
      };
  }

  const columns: GridColDef[] = [
    { field: 'id', editable: true, headerName: 'ID', width: 30 },
    { field: 'img', headerName: 'Фото товару', width: 120 },
    { field: 'name', editable: true,
      preProcessEditCellProps: (params) => errorValue(params),
      headerName: 'Назва товару',
      width: 270,
      renderCell: (params) => (
        <Badge 
        elem={params.row}
        />
    )},
    { field: 'category', editable: true, headerName: 'Категорія', width: 120,
      preProcessEditCellProps: (params) => errorValue(params),
    },
    { field: 'price', editable: true, headerName: 'Ціна', width: 100,
      preProcessEditCellProps: (params) => errorValue(params),
      valueFormatter: (params) => `${parseInt(params.value as string).toLocaleString('ua-UA')} грн.` },
    { field: 'count', editable: true, headerName: 'К-сть', width: 70,     
      preProcessEditCellProps: (params) => errorValue(params)
    },
    { field: 'display', editable: true, headerName: 'Відображення', width: 130,
      preProcessEditCellProps: (params) => errorValue(params),
    },
    { field: 'createdAt', editable: true, headerName: 'Створено', width: 130, type: 'date',
      valueFormatter: (params) => new Date(params.value as string).toLocaleDateString() },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <ButtonActions icon={<EditIcon />} label="Edit" onClick={() => handleButtonEdit(params.row.id)}/>,
        <ButtonActions icon={<DeleteIcon />} label="Delete" onClick={() => handleButtonDelete(params.row.id, params.row.name)}/>,
      ],
    }
  ];

  const getSelectedRowsToExport = ({
    apiRef,
  }: GridPrintGetRowsToExportParams): GridRowId[] => {
    const selectedRowIds = selectedGridRowsSelector(apiRef);
    console.log(selectedRowIds);
    if (selectedRowIds.size > 0) {
      return Array.from(selectedRowIds.keys());
    }
  
    return gridFilteredSortedRowIdsSelector(apiRef);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarExport printOptions= {{ getRowsToExport: getSelectedRowsToExport }} />
      </GridToolbarContainer>
    );
  }
  
  console.log(GridToolbar, CustomToolbar);

  return (
    <ProductsWallpaper>
      <ProductsHeader>
        <SubHeaderProduct>
          <Typography variant="h3">Товари</Typography>
          <VioletButton title="СТВОРИТИ НОВИЙ"></VioletButton>
        </SubHeaderProduct>
      </ProductsHeader>
      <DeleteModal open={open} onClose={handleClose} nameProduct={selectedProduct.nameProduct} id={selectedProduct.id} />
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
            slots={{ toolbar: CustomToolbar }}
            // slotProps={{
            //   toolbar: { printOptions: { getRowsToExport: getSelectedRowsToExport } },
            // }}
          />
        ) : (
          <div>Oops!</div>
        )}
      </ProductTable>
    </ProductsWallpaper>
  );
};

export default Products;
