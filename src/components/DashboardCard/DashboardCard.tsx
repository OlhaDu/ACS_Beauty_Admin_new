// import ArrowToTopIcon from "src/images/svg/ArrowToTopIcon";

import s from "./DashboardCard.module.scss";

interface Props {
  itemHeading: string;
  itemQuantity: number;
  itemIcon: React.ReactNode;
  totalItemQuantity: number;
  itemIncrease: number;
}

const DashboardCard: React.FC<Props> = ({
  itemHeading,
  itemQuantity,
  itemIcon,
  totalItemQuantity,
  itemIncrease,
}) => {
  return (
    <div className={s.container}>
      <div className={s.topInfoContainer}>
        <section>
          <h5>{itemHeading ? `${itemHeading}` : "Місячний приріст"}</h5>
          <h2>{itemQuantity ? `${itemQuantity}` : "Дані відсутні"}</h2>
        </section>
        <div className={s.iconContainer}>{itemIcon}</div>
      </div>
      <div className={s.bottomInfoContainer}>
        <h5>
          Всього: {totalItemQuantity ? `${totalItemQuantity}` : "Дані відсутні"}
        </h5>
        <h6>
          {itemIncrease ? (
            <>{/* {itemIncrease}% <ArrowToTopIcon /> */}</>
          ) : (
            "Дані відсутні"
          )}
        </h6>
      </div>
    </div>
  );
};

export default DashboardCard;
