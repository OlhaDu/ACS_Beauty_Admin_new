import s from "./Table.module.scss";

import * as React from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import DeleteIcon from "../../images/svg/DeleteIcon.tsx";
import EditIcon from "../../images/svg/EditIcon.tsx";

interface Column {
    field: string;
    headerName: string;
    type?: string;
    width: number;
}

interface Row {
    [key: string]: number | string;
}

interface DataTableProps {
    columns: Column[];
    rows: Row[];
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({columns, rows, onEdit, onDelete}) => {
    const hasActions = onDelete || onEdit;

    const columnsWithActions: GridColDef[] = hasActions
        ? [
            ...columns,
            {
                field: 'actions',
                headerName: 'ДіЇ',
                width: 100,
                renderCell: (params) => (
                    <div className={s.actionButtons}>
                        {onEdit && (
                            <button onClick={() => onEdit && onEdit(params.row.id as number)}>
                                <EditIcon className={s.svg}/>
                            </button>)}
                        {onDelete && (<button onClick={() => onDelete && onDelete(params.row.id as number)}>
                            <DeleteIcon className={s.svg}/>
                        </button>)}
                    </div>
                ),
            },
        ]
        : columns;
    return (
        <div className={s.table}>
            <DataGrid
                rows={rows}
                columns={columnsWithActions}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 10},
                    },
                }}
                pageSizeOptions={[10, 25, 50, 100]}
            />
        </div>
    );
};

export default DataTable;
