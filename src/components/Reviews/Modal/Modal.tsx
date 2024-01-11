import s from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import CloseIcon from "src/images/svg/CloseIcon";

const modalRoot = document.querySelector('#modal-root');

interface ModalProps {
    toggleModal: () => void;
    children: React.ReactNode;
  }

export const ModalSample:React.FC<ModalProps> = ({ toggleModal, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const close = (e: KeyboardEvent) => {
      if(e.code === 'Escape'){            
        toggleModal()
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [toggleModal]);

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        toggleModal();       
      }
    };
    window.addEventListener('mousedown', closeModal);
    return () => window.removeEventListener('mousedown', closeModal);
  }, [toggleModal]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return modalRoot ? createPortal(
    <div className={s.modal_backdrop} onClick={handleBackdropClick}>       
      <div className={s.modal_content} ref={modalRef} >   
      <button className={s.modal_close}  title="Close" type="button" onClick={toggleModal} >
          <CloseIcon />
        </button>     
        {children}
      </div>
    </div>,
    modalRoot
  ) : null;
};