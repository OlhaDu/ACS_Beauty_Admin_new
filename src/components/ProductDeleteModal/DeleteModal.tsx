import React from 'react';
import Typography from '@mui/material/Typography';
import { useDispatch } from "react-redux";
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from "redux";
import { RootState } from 'src/redux/store';
import { DeleteModalProps } from 'src/types';
import { ModalMain, ModalWrapper } from './DeleteModalThema';
import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { deleteProductAsync } from 'src/redux/slices/productActionsSlice';

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, nameProduct, id }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();

  const handleButtonDeleteModal = async () => {
    if (!isNaN(id)) {
      await dispatch(deleteProductAsync(id));
    } else {
      console.error('Invalid id:', id);
    }
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <ModalMain>
        <ClearIcon onClick={onClose} />
        <Typography variant="h6" component="h2">
          Видалити {nameProduct} ?
        </Typography>
        <Typography>
          Ви впевнені, що хочете видалити {nameProduct} ?
        </Typography>
        <Button onClick={handleButtonDeleteModal}>Видалити товар</Button>
        <Button onClick={onClose}>Відміна</Button>
      </ModalMain>
    </ModalWrapper>
  );
};

export default DeleteModal;
