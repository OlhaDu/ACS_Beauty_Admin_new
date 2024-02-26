// import ArrowToTopIcon from "src/images/svg/ArrowToTopIcon";
import { Grid, Card, Typography } from "@mui/material"
import s from "./DashboardCard.module.scss"
import { itemOptions, dataOptions, allOptions, iconOptions } from "./menuOptions"

const DashboardCard = () => {
  return (
    <>
      <Grid container spacing={4}>
        {itemOptions.map((option, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card className={s.card}>
              <div className={s.card_text}>
                <Typography>{option.label}</Typography>
                <div>{iconOptions[index].label}</div>
              </div>
              <Typography
                variant="h3"
                style={{ fontSize: "48px", paddingTop: "24px", paddingBottom: "24px", margin: "0" }}
              >
                {dataOptions[index].label}
              </Typography>
              <div className={s.card_text}>
                <Typography>Всього: {allOptions[index].label}</Typography>
                <Typography>10%</Typography>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default DashboardCard
