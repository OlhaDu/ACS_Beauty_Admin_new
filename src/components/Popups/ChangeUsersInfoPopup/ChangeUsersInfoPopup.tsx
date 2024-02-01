import React, { useState } from "react"
import s from "./ChangeUsersInfoPopup.module.scss"
import CloseIcon from "../../../images/svg/CloseIcon_.jsx"
import VioletButton from "../../Buttons/VioletButton/VioletButton.tsx"
import WhiteButton from "../../Buttons/WhiteButton/WhiteButton.tsx"
import { IUpdatedUser, IUser } from "../../../types/IUsers.ts"

interface IProps {
  onSuccess: (user: IUpdatedUser) => void
  user: IUser
  onClose: () => void
}

const userFields = {
  firstName: "Імʼя",
  lastName: "Призвище",
  email: "Email",
  phone: "Телефон",
  note: "Примітки",
}
const ChangeUsersInfoPopup: React.FC<IProps> = ({ onSuccess, user, onClose }) => {
  const [updatedUser, setUpdatedUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    note: user.note,
  })

  const handleInputChange = (fieldName: string, value: string) => {
    setUpdatedUser(prevUserData => ({
      ...prevUserData,
      [fieldName]: value,
    }))
  }

  return (
    <div className={s.modal}>
      <div className={s.popupBody}>
        <div className={s.header}>
          <h4>ЗМІНИТИ ІНФОРМАЦІЮ ПРО КОРИСТУВАЧА</h4>
          <div className={s.closeIcon}>
            <CloseIcon onClick={onClose} />
          </div>
        </div>
        <div className={s.main}>
          <div>
            <span>Користувач: №</span>
            {user.id}
          </div>
          <div className={s.form}>
            <div>
              <label htmlFor={userFields.firstName}>{userFields.firstName}</label>
              <input
                name={userFields.firstName}
                type="text"
                value={updatedUser.firstName}
                onChange={e => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={userFields.lastName}>{userFields.lastName}</label>
              <input
                name={userFields.lastName}
                type="text"
                value={updatedUser.lastName}
                onChange={e => handleInputChange("lastName", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={userFields.email}>{userFields.email}</label>
              <input
                name={userFields.email}
                type="text"
                value={updatedUser.email}
                onChange={e => handleInputChange("email", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={userFields.phone}>{userFields.phone}</label>
              <input
                name={userFields.phone}
                type="text"
                value={updatedUser.phone}
                onChange={e => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={userFields.note}>{userFields.note}</label>
              <input
                name={userFields.note}
                type="text"
                value={updatedUser.note}
                onChange={e => handleInputChange("note", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={s.footer}>
          <WhiteButton onClick={onClose} title={"Видалити мітку"} />
          <VioletButton onClick={() => onSuccess(updatedUser)} title={"ЗБЕРЕГТИ"} />
        </div>
      </div>
    </div>
  )
}

export default ChangeUsersInfoPopup
