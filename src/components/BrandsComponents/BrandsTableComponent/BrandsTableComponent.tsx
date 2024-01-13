import { useSelector } from "react-redux";
import { useState } from "react";

import { columns } from "./columns";
import { useAppDispatch } from "src/redux/store";
import { deleteBrand } from "src/redux/brands/operations";
import {
  selectBrands,
  selectCount,
  selectIsLoading,
} from "src/redux/brands/selectors";

import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import ModalWindow from "src/components/ModalWindow";
import BrandManagementForm from "../BrandManagementForm";

import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";

interface IPaginationModel {
  page: number;
  pageSize: number;
}

interface IBrandsTableProps {
  paginationModel: IPaginationModel;
  setPaginationModel: (params: IPaginationModel) => void;
}

const BrandsTableComponent: React.FC<IBrandsTableProps> = ({
  paginationModel,
  setPaginationModel,
}) => {
  const dispatch = useAppDispatch();
  const brands = useSelector(selectBrands);
  const count = useSelector(selectCount);
  const isLoading = useSelector(selectIsLoading);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<GridRowId | null>(null);

  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "Дії",
    width: 100,
    cellClassName: "actions",

    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          color="inherit"
          onClick={() => {
            setIsOpenModal(true);
            setSelectedBrand(id);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="inherit"
          onClick={() => {
            dispatch(deleteBrand(id));
          }}
        />,
      ];
    },
  };

  const tableColumns: GridColDef[] = columns.map((col) =>
    col.field === "description"
      ? {
          ...col,
          renderCell: ({ value }) => (
            <div style={{ whiteSpace: "normal" }}>{value}</div>
          ),
        }
      : col
  );

  tableColumns.push(actionsColumn);

  return (
    !isLoading && (
      <>
        <Box
          sx={{
            width: "100%",
            display: "flex",

            flexDirection: "column",

            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F8F0FB",
            },
            ".MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        >
          <DataGrid
            rows={brands}
            columns={tableColumns}
            checkboxSelection={false}
            disableRowSelectionOnClick={true}
            isCellEditable={() => false}
            isRowSelectable={() => false}
            rowCount={count}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            columnHeaderHeight={44}
            rowHeight={107}
          />
        </Box>

        <ModalWindow
          title={"ДОДАТИ БРЕНД"}
          onClose={() => setIsOpenModal(false)}
          isOpenModal={isOpenModal}
        >
          <BrandManagementForm
            brand={
              selectedBrand
                ? brands.find((brand) => brand.id === selectedBrand)
                : null
            }
            onClose={() => setIsOpenModal(false)}
          />
        </ModalWindow>
      </>
    )
  );
};

export default BrandsTableComponent;
