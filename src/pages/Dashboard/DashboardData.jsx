import ProductsIcon from 'src/images/svg/ProductsIcon';
import IncomeIcon from 'src/images/svg/IncomeIcon';
import LoginIcon from 'src/images/svg/LoginIcon';
import ReviewsIcon from 'src/images/svg/ReviewsIcon';

export const dashboardData = [
    {
      itemHeading: "Замовлення на місяць",
      itemQuantity: 12,
      itemIcon: <ProductsIcon color={"#5C5E60"} />,
      totalItemQuantity: 2356,
      itemIncrease: "10",
    },
    {
      itemHeading: "Надходження на місяць",
      itemQuantity: 12567,
      itemIcon: <IncomeIcon />,
      totalItemQuantity: 3456890,
      itemIncrease: "10",
    },
    {
      itemHeading: "Відвідувачів на місяць",
      itemQuantity: 3878,
      itemIcon: <LoginIcon color={"#5C5E60"} />,
      totalItemQuantity: 3456906,
      itemIncrease: "10",
    },
    {
      itemHeading: "Відгуків на місяць",
      itemQuantity: 70,
      itemIcon: <ReviewsIcon color={"#5C5E60"} />,
      totalItemQuantity: 1200,
      itemIncrease: "10",
    },
  ];