import MessageIconColor from "src/images/svg/MessageIconColor"
import AccountIconColor from "src/images/svg/AccountIconColor"
import CurrentIconColor from "src/images/svg/CurrentIconColor"
import ProductsIconColor from "src/images/svg/ProductsIconColor"

export const itemOptions = [
  { label: "Замовлення на місяць", value: "order" },
  { label: "Надходження на місяць", value: "receipts" },
  { label: "Відвідувачів на місяць", value: "visitors" },
  { label: "Відгуків на місяць", value: "reviews" },
]

export const dataOptions = [
  { label: "12", value: "order" },
  { label: "12567 ₴", value: "receipts" },
  { label: "3878", value: "visitors" },
  { label: "70", value: "reviews" },
]
export const allOptions = [
  { label: "2356", value: "order" },
  { label: "3456890 ₴", value: "receipts" },
  { label: "3456906", value: "visitors" },
  { label: "1200", value: "reviews" },
]
export const iconOptions = [
  { label: <ProductsIconColor background={"#948AD0"} />, value: "order" },
  { label: <CurrentIconColor background={"#948AD0"} />, value: "receipts" },
  { label: <AccountIconColor background={"#948AD0"} />, value: "visitors" },
  { label: <MessageIconColor background={"#948AD0"} />, value: "reviews" },
]
