import { useState } from "react";

import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";

interface IColumn {
  field: string;
  headerName: string;
  width?: number;
  editable?: boolean;
  type?: string;
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
  valueOptions?: string[];
}

interface IDataTableProps {
  setIsOpenModal: () => void;
  columns: IColumn[];
  rows: GridRowsProp;
}

const BrandsTableComponent: React.FC<IDataTableProps> = ({
  setIsOpenModal,
  columns,
  rows,
}) => {
  const [gridRows, setGridRows] = useState(rows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "Дії",
    width: 100,
    cellClassName: "actions",

    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      return isInEditMode
        ? [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              color="inherit"
            />,
          ]
        : [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              color="inherit"
              onClick={() => {
                console.log(gridRows.filter((item) => item.id === id));
                setIsOpenModal(true);
              }}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              color="inherit"
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
    <Box
      sx={{
        // height: 500,
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
      }}
    >
      <DataGrid
        rows={rows}
        columns={tableColumns}
        editMode="row"
        density="comfortable"
        rowModesModel={rowModesModel}
        checkboxSelection={false}
        rowSelection={false}
        slotProps={{
          toolbar: { setRows: setGridRows, setRowModesModel },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        getRowId={(row) => row.id}
        columnHeaderHeight={44}
        rowHeight={107}
      />
    </Box>
  );
};

export default BrandsTableComponent;
