import { ReactNode, FC } from "react";
import s from "./DashboardCard.module.scss";
import ArrowToTopWithTailIcon from "src/images/svg/ArrowToTopWithTailIcon";

type Props = {
  itemHeading: string;
  itemQuantity: number;
  itemIcon: ReactNode;
  totalItemQuantity: number;
  itemIncrease: number;
};

const DashboardCard: FC<Props> = ({
  itemHeading,
  itemQuantity,
  itemIcon,
  totalItemQuantity,
  itemIncrease,
}) => (
  <div className={s.cardContainer}>
    
    <div className={s.leftContainer}>
      <div>{itemHeading ? itemHeading : "Місячний приріст"}</div>
      <div className={s.monthsQuantity}>
        {itemQuantity 
        ? itemHeading === 'Надходження за місяць' 
          ? `${itemQuantity} ₴` 
          : itemQuantity
        : "Дані відсутні"}
      </div>
      <div>
        Всього: {totalItemQuantity 
        ? itemHeading === 'Надходження за місяць'
          ? `${totalItemQuantity} ₴`
          : totalItemQuantity
        : "Дані відсутні"}
      </div>
    </div>

    <div className={s.rightContainer}>
      <div className={s.iconContainer}>{itemIcon}</div>
      <div>
        {itemIncrease ? (
          <>
            {itemIncrease}% <ArrowToTopWithTailIcon />
          </>
        ) : (
          "Дані відсутні"
        )}
      </div>
    </div>
  </div>
);

export default DashboardCard;
