import React from "react";
import s from "./ChangeStatus.module.scss"

interface ReviewData {
    id: string;
    productName: string;
    review: string;
    status: string;
  }
  
  interface ChangeStatusProps {
    selectedProducts: ReviewData[];
  }
  
const ChangeStatus: React.FC<ChangeStatusProps> = ({ selectedProducts }) => {
    console.log("SelectedProducts", selectedProducts)
  return (
    <div>
      <p className={s.modal_title}>ЗМІНИТИ СТАТУС ВІДГУКУ</p>
      <ul >        
        {selectedProducts.map((review) => (
          <li key={review.id}className={s.statusContainer}>            
            <p  className={s.modal_text}>Товар: <span className={s.modal_span}>{review.productName}</span> </p>
            <p className={s.modal_text}>Відгук:<span className={s.modal_span}>{review.review}</span> </p>
            {/* <p className={s.modal_text}><span>{review.status}</span></p> */}
            <div className={s.radioBtn}>            
            <label htmlFor="published" aria-label="Label for the checkbox">
            <input type="radio" name="status" id="published" />
             Опубліковано
            </label>            
            <label htmlFor="verification" aria-label="Label for the checkbox">
            <input type="radio" name="status" id="verification" />
            На перевірці
            </label>
            </div>           
            <button type="button" title="SafeButton" className={s.safeBtn}> ЗБЕРЕГТИ</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChangeStatus;
