import React from "react";
import s from "./ChangeOrderStatusPopup.module.scss";
import CloseIcon from "../../../images/svg/CloseIcon.jsx";
import VioletButton from "../../Buttons/VioletButton/VioletButton.tsx";
import WhiteButton from "../../Buttons/WhiteButton/WhiteButton.tsx";

interface DataTableProps {
    onSuccess: () => void;
    id: number | null;
    onClose: () => void;
}

const ChangeOrderStatusPopup: React.FC<DataTableProps> = ({onSuccess, id, onClose}) => {
    return (
        <div className={s.modal}>
            <div className={s.popupBody}>
                <div className={s.header}>
                    <h4>ЗМІНИТИ СТАТУС ЗАМОВЛЕННЯ</h4>
                    <div
                        className={s.closeIcon}
                        onClick={onClose}
                    ><CloseIcon/></div>
                </div>
                <div className={s.main}>
                    <div><span>Замовлення: №</span>{id}</div>
                    <div className={s.radios__block}>
                        <div>
                            <input type="radio" id="new" name="status" value="new"/>
                            <label htmlFor="new">Нове</label>
                        </div>
                        <div>
                            <input type="radio" id="accepted" name="status" value="accepted"/>
                            <label htmlFor="accepted">Прийнято</label>
                        </div>
                        <div>
                            <input type="radio" id="paid" name="status" value="paid"/>
                            <label htmlFor="paid">Оплачено</label>
                        </div>
                        <div>
                            <input type="radio" id="done" name="status" value="done"/>
                            <label htmlFor="done">Виконано</label>
                        </div>
                        <div>
                            <input type="radio" id="canceled" name="status" value="canceled"/>
                            <label htmlFor="canceled">Скасовано</label>
                        </div>
                    </div>
                </div>
                <div className={s.footer}>
                    <WhiteButton onClick={onClose} title={'Видалити мітку'}/>
                    <VioletButton onClick={onSuccess} title={'ЗБЕРЕГТИ'}/>
                </div>
            </div>
        </div>
    );
};


export default ChangeOrderStatusPopup;
