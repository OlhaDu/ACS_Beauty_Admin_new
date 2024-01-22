import React from "react";
import s from "./ChangeOrderStatusPopup.module.scss";
import CloseIcon from "../../../images/svg/CloseIcon.jsx";
import VioletButton from "../../Buttons/VioletButton/VioletButton.tsx";
import WhiteButton from "../../Buttons/WhiteButton/WhiteButton.tsx";

interface Props {
  onSuccess: () => void;
  id: number | null;
  onClose: () => void;
}

const statusOptions = [
  { id: "new", value: "new", label: "Нове" },
  { id: "accepted", value: "accepted", label: "Прийнято" },
  { id: "paid", value: "paid", label: "Оплачено" },
  { id: "done", value: "done", label: "Виконано" },
  { id: "canceled", value: "canceled", label: "Скасовано" },
];
const ChangeOrderStatusPopup: React.FC<Props> = ({
  onSuccess,
  id,
  onClose,
}) => {
  return (
    <div className={s.modal}>
      <div className={s.popupBody}>
        <div className={s.header}>
          <h4>ЗМІНИТИ СТАТУС ЗАМОВЛЕННЯ</h4>
          <div className={s.closeIcon} onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
        <div className={s.main}>
          <div>
            <span>Замовлення: №</span>
            {id}
          </div>
          <div className={s.radios__block}>
            {statusOptions.map((option) => (
              <div key={option.id}>
                <input
                  type="radio"
                  id={option.id}
                  name="status"
                  value={option.value}
                />
                <label htmlFor={option.id}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={s.footer}>
          <WhiteButton onClick={onClose} title={"Видалити мітку"} />
          <VioletButton onClick={onSuccess} title={"ЗБЕРЕГТИ"} />
        </div>
      </div>
    </div>
  );
};

export default ChangeOrderStatusPopup;
