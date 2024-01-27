import { Container, Modal, Typography, styled } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

export const ModalWrapper = styled(Modal)`
    background: rgba(148, 138, 208, 0.50);
`;

export const ModalMain = styled(Container)`
  position: absolute;
  font-family: Roboto;
  font-weight: 400;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 200px;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  background: #FFF;
  box-shadow: 24px;
  padding: 18px;
`;

export const ModalMainText = styled(Typography)`
  padding: 5px 0;
  text-align: center;
`;

export const ModalButtons = styled('div')`
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: 15%;
  gap: 16px;

  & Button:nth-of-type(1) {
    color: #176FC7;
    text-transform: none;
  }

  & Button:nth-of-type(2) {
    color: white;
    border-radius: 8px;
    background: #948AD0;
    width: 140px;
  }
`;


export const ModalMainHeader = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  position: relative;
  top: -25px;
`;

export const ModalClearButton = styled(ClearIcon)`
  position: relative;
  left: 96%;
  cursor: pointer;
  z-index: 4;
`;

