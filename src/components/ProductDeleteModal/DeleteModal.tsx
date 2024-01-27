import React from 'react';
import { useDispatch } from "react-redux";
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from "redux";
import { RootState } from 'src/redux/store';
import { DeleteModalProps } from 'src/types';
import { ModalClearButton, ModalMainHeader, ModalMain, ModalWrapper, ModalMainText, ModalButtons } from './DeleteModalThema';
import { Button } from '@mui/material';
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
        <ModalClearButton onClick={onClose} />
        <ModalMainHeader variant="h2">
          Видалити {nameProduct} ?
        </ModalMainHeader>
        <ModalMainText>
          Ви впевнені, що хочете видалити {nameProduct} ?
        </ModalMainText>
        <ModalButtons>
          <Button onClick={handleButtonDeleteModal}>Видалити товар</Button>
          <Button onClick={onClose}>Відміна</Button>
        </ModalButtons>
      </ModalMain>
    </ModalWrapper>
  );
};

export default DeleteModal;
