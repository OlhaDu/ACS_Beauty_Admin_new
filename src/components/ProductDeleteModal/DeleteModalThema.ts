import { Container, Modal, styled } from "@mui/material";

export const ModalMain = styled(Container)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 628px;
  height: 327px;
  transform: translate(-50%, -50%);
  width: 400px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  background: #FFF;
  box-shadow: 24px;
  padding: 4px;
  & .MuiSvgIcon-root {
    cursor: pointer
  }
`;

export const ModalWrapper = styled(Modal)`
    background: rgba(148, 138, 208, 0.50);
`;

