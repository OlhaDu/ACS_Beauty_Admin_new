import React, { ReactNode } from "react"
import s from "./InfoPopup.module.scss"
import CloseIcon from "../../../images/svg/CloseIcon_.jsx"

interface IProps {
  children: ReactNode
  onClose: () => void
}

const InfoPopup: React.FC<IProps> = ({ children, onClose }) => {
  return (
    <div className={s.modal}>
      <div className={s.popupBody}>
        <div className={s.closeIcon}>
          <CloseIcon onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  )
}

export default InfoPopup
