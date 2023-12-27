import { ReactNode, FC } from "react";
import styles from "./DashboardCard.module.scss";
import ArrowToTopWithTailIcon from "src/images/svg/ArrowToTopWithTailIcon";

// определиться какой тип данных ожидаем
type DashboardCardProps = {
  itemHeading: string;
  itemQuantity: string | number;
  itemIcon: ReactNode;
  totalItemQuantity: string | number;
  itemIncrease: string | number;
};

const DashboardCard: FC<DashboardCardProps> = ({
  itemHeading,
  itemQuantity,
  itemIcon,
  totalItemQuantity,
  itemIncrease,
}) => (
  <div className={styles.cardContainer}>
    
    <div className={styles.leftContainer}>
      <div>{itemHeading ? itemHeading : "Місячний приріст"}</div>
      <div className={styles.monthsQuantity}>
        {itemQuantity ? itemQuantity : "Дані відсутні"}
      </div>
      <div>
        Всього: {totalItemQuantity ? totalItemQuantity : "Дані відсутні"}
      </div>
    </div>

    <div className={styles.rightContainer}>
      <div className={styles.iconContainer}>{itemIcon}</div>
      <div className={styles.increaseInfo}>
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
