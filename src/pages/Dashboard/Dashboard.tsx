import React, {useEffect, useState} from "react"
import DashboardCard from "src/components/Dashboard/DashboardCard"
import s from "./Dashboard.module.scss"
import SearchInput from "src/components/ToolsPanel/SearchInput/SearchInput"

import AdminLayout from "src/layouts/AdminLayout"
import ExportButton from "src/components/Reviews/Export"
import DashboardTable from "src/components/Dashboard/DashboardTable"
import { useAppDispatch } from "src/redux/store"
import { getDashboards } from "src/redux/dashboards/operations"

const Dashboard = () => {

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchName, setSearchName] = useState("")

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      getDashboards({
        lookup: searchName,
        pageSize,
        page: page + 1,
      
      })
    )
  }, [searchName, pageSize, page])

  return (
    <AdminLayout>
      <div className={s.container}>
        <h3>З поверненням, Оля!</h3>        
          <DashboardCard />
          <h3>Останні замовлення</h3>
          <div className={s.inputButton}>
            <SearchInput onChange={setSearchName}/>
            <ExportButton/>
          </div>
          <DashboardTable
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}/>
      
      </div>
    </AdminLayout>
  )
}

export default Dashboard
