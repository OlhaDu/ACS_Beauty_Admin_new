import React from "react"

import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"

import { GridActionsCellItem } from "@mui/x-data-grid"

interface IProps {
  onEditClick: () => void
  onDeleteClick: () => void
}

const ActionsColumn: React.FC<IProps> = ({ onEditClick, onDeleteClick }) => {
  return (
    <>
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        color="inherit"
        onClick={() => onEditClick()}
      />
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        color="inherit"
        onClick={() => onDeleteClick()}
      />
    </>
  )
}

export default ActionsColumn
