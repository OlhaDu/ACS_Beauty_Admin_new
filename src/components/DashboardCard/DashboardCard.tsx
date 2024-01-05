import { ReactNode, FC } from "react"
import s from "./DashboardCard.module.scss"
import ArrowToTopWithTailIcon from "src/images/svg/ArrowToTopWithTailIcon"

type Props = {
  itemHeading: string
  itemQuantity: number
  itemIcon: ReactNode
  totalItemQuantity: number
  itemIncrease: number
}

const getLabel = (itemQuantity:number, itemHeading: string) => {
  if (itemQuantity) {
    if (itemHeading === "Надходження за місяць") {
      return `${itemQuantity} ₴`
    }
    return itemQuantity
  }
  return "Дані відсутні"
}

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
        {getLabel(itemQuantity, itemHeading)}
      </div>
      <div>
        Всього:{" "}
        {getLabel(totalItemQuantity, itemHeading)}
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
)

export default DashboardCard
