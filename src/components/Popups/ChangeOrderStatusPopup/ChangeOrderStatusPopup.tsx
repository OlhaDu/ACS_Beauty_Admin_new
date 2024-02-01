import React, { useState } from "react"
import s from "./ChangeOrderStatusPopup.module.scss"
import CloseIcon from "../../../images/svg/CloseIcon_.jsx"
import VioletButton from "../../Buttons/VioletButton/VioletButton.tsx"
import WhiteButton from "../../Buttons/WhiteButton/WhiteButton.tsx"
import { IOrder } from "../../../types/IOrders.ts"

interface Props {
  onSuccess: (order: IOrder) => void
  order: IOrder
  onClose: () => void
}

const statusOptions = [
  { id: "new", value: "new", label: "Нове" },
  { id: "accepted", value: "accepted", label: "Прийнято" },
  { id: "paid", value: "paid", label: "Оплачено" },
  { id: "done", value: "done", label: "Виконано" },
  { id: "canceled", value: "canceled", label: "Скасовано" },
]
const ChangeOrderStatusPopup: React.FC<Props> = ({ onSuccess, order, onClose }) => {
  const [updatedOrder, setUpdatedOrder] = useState({
    id: order.id,
    customer: order.customer,
    total: order.total,
    status: order.status,
    deliveryMethod: order.deliveryMethod,
    waybill: order.waybill,
    comments: order.comments,
    additionDate: order.additionDate,
  })

  const handleInputChange = (fieldName: string, value: string) => {
    setUpdatedOrder(prevUserData => ({
      ...prevUserData,
      [fieldName]: value,
    }))
  }

  return (
    <div className={s.modal}>
      <div className={s.popupBody}>
        <div className={s.header}>
          <h4>ЗМІНИТИ СТАТУС ЗАМОВЛЕННЯ</h4>
          <div className={s.closeIcon}>
            <CloseIcon onClick={onClose} />
          </div>
        </div>
        <div className={s.main}>
          <div>
            <span>Замовлення: №</span>
            {order.id}
          </div>
          <div className={s.radios__block}>
            {statusOptions.map(option => (
              <div key={option.id}>
                <input
                  type="radio"
                  id={option.id}
                  name="status"
                  value={option.value}
                  checked={order.status === option.value}
                />
                <label htmlFor={option.id}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={s.footer}>
          <WhiteButton onClick={onClose} title={"Видалити мітку"} />
          <VioletButton onClick={() => onSuccess(updatedOrder)} title={"ЗБЕРЕГТИ"} />
        </div>
      </div>
    </div>
  )
}

export default ChangeOrderStatusPopup
