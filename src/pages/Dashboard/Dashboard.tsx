import s from './Dashboard.module.scss'
import DashboardCard from 'src/components/DashboardCard/DashboardCard'
import { dashboardData } from './DashboardData'
import ToolsPanel from 'src/components/ToolsPanel/ToolsPanel'
// import { OrdersFilterData } from 'src/components/Filter/FilterData'
// import { OrdersActionsData } from 'src/components/Actions/OrdersActionsData'
// import { RowsOnPageFilterData } from 'src/components/RowsOnPageFilter/RowsOnPageFilterData'

const Dashboard = () => {
  return (
    <div className={s.container}>
      <div className={s.greeting}>З поверненням, Оля!</div>

      <div className={s.dashboardCards}>
        {dashboardData.map((data, index) => (
          <DashboardCard key={index} {...data} />
        ))}
      </div>

      <div className={s.ordersContainer}>
        <div className={s.orders}>Останні замовлення</div>

        <ToolsPanel
          // filterOptions={{ options: OrdersFilterData }}
          // actionOptions={{ actions: OrdersActionsData }}
          // rowsOptions={{ rows: RowsOnPageFilterData }}
        />

        <div className={s.table}>Тут будет таблица</div>
      </div>
    </div>
  )
}

export default Dashboard
