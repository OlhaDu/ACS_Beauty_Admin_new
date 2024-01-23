import React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DeleteModalProps } from 'src/types';
import { ModalMain } from './DeleteModalThema';

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, nameProduct, id }) => {
  
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby={`modal-${id}-title`}
        aria-describedby={`modal-${id}-description`}
      >
        <ModalMain>
          <Typography id={`modal-${id}-title`} variant="h6" component="h2">
          Видалити {nameProduct} ?
          </Typography>
          <Typography id={`modal-${id}-description`} sx={{ mt: 2 }}>
            Ви впевнені, що хочете видалити {nameProduct} ?
          </Typography>
        </ModalMain>
      </Modal>
    );
  };

export default DeleteModal;