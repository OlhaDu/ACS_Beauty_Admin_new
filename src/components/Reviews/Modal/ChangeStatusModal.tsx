import React, { useState } from "react";
import s from "./ChangeStatus.module.scss";

interface ChangeStatusProps {
  onSave: (selectedStatus: string) => void;
  onClose: () => void;
}

const ChangeStatus: React.FC<ChangeStatusProps> = ({onSave, onClose }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  console.log("selectedStatus item", selectedStatus);
const handleSave = () => {
  onSave(selectedStatus);
  onClose()
}

  return (
    <div>
      <p className={s.modal_title}>ЗМІНИТИ СТАТУС ВІДГУКУ</p>
      <div className={s.radioBtn}>
        <label htmlFor="published" aria-label="Label for the checkbox">
          <input
            type="radio"
            name="changeStatus"
            id="published"
            onChange={() => setSelectedStatus("published")}
          />
          Опубліковано
        </label>
        <label htmlFor="verification" aria-label="Label for the checkbox">
          <input
            type="radio"
            name="changeStatus"
            id="verification"
            onChange={() => setSelectedStatus(" pending")}
          />
          На перевірці
        </label>
        <button type="button" title="SafeButton" className={s.safeBtn} onClick={handleSave}>
          ЗБЕРЕГТИ
        </button>
      </div>
    </div>
  );
};

export default ChangeStatus;
