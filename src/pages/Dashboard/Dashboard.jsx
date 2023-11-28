import React from "react";
import styles from "./Dashboard.module.scss";
import DashboardCard from "/components/DashboardCard/DashboardCard";
import ProductIcon from "../../svgs/ProductsIcon";
import IncomeIcon from "../../svgs/IncomeIcon";
import LoginIcon from "../../svgs/LoginIcon";
import ReviewsIcon from "../../svgs/ReviewsIcon";
import ToolsPanel from "../../components/ToolsPanel/ToolsPanel";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h3>З поверненням, Оля!</h3>
      <div className={styles.dashboards}>
        <DashboardCard
          itemHeading={"Замовлення на місяць"}
          itemQuantity={"12"}
          itemIcon={<ProductIcon color={"#5C5E60"} />}
          totalItemQuantity={"2356"}
          itemIncrease={"10"}
        />
        <DashboardCard
          itemHeading={"Надходження на місяць"}
          itemQuantity={"12567₴"}
          itemIcon={<IncomeIcon color={"#5C5E60"} />}
          totalItemQuantity={"3456890₴"}
          itemIncrease={"10"}
        />
        <DashboardCard
          itemHeading={"Відвідувачів на місяць"}
          itemQuantity={"3878"}
          itemIcon={<LoginIcon color={"#5C5E60"} />}
          totalItemQuantity={"3456906"}
          itemIncrease={"10"}
        />
        <DashboardCard
          itemHeading={"Відгуків на місяць"}
          itemQuantity={"70"}
          itemIcon={<ReviewsIcon color={"#5C5E60"} />}
          totalItemQuantity={"1200"}
          itemIncrease={"10"}
        />
      </div>
      <div className={styles.orders}>
        <h4>Останні замовлення</h4>
        <ToolsPanel />
        <div className={styles.table}>Тут будет таблица</div>
      </div>
    </div>
  );
};

export default Dashboard;
