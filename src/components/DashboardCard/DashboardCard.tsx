import { ReactNode, FC } from "react";
import s from "./DashboardCard.module.scss";
import ArrowToTopWithTailIcon from "src/images/svg/ArrowToTopWithTailIcon";

type DashboardCardProps = {
  itemHeading: string;
  itemQuantity: number;
  itemIcon: ReactNode;
  totalItemQuantity: number;
  itemIncrease: string | number;
};

const DashboardCard: FC<DashboardCardProps> = ({
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
        {itemQuantity ? itemQuantity : "Дані відсутні"}
      </div>
      <div>
        Всього: {totalItemQuantity || "Дані відсутні"}
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
