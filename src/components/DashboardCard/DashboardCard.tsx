// import ArrowToTopIcon from "src/images/svg/ArrowToTopIcon";

import styles from "./DashboardCard.module.scss";

const DashboardCard = ({
  itemHeading,
  itemQuantity,
  itemIcon,
  totalItemQuantity,
  itemIncrease,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.topInfoContainer}>
        <section>
          <h5>{itemHeading ? `${itemHeading}` : "Місячний приріст"}</h5>
          <h2>{itemQuantity ? `${itemQuantity}` : "Дані відсутні"}</h2>
        </section>
        <div className={styles.iconContainer}>{itemIcon}</div>
      </div>
      <div className={styles.bottomInfoContainer}>
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
