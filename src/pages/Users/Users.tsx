import { useEffect, useState } from "react"
import s from "./Users.module.scss"

import Select from "src/components/ToolsPanel/Select/Select"
import SearchInput from "src/components/ToolsPanel/SearchInput/SearchInput"
import FilterIcon from "../../images/svg/FilterIcon"
import ActionsIcon from "../../images/svg/ActionsIcon"
import ExportFileIcon from "../../images/svg/ExportFileIcon"
import RowListIcon from "../../images/svg/RowListIcon"
import axios from "axios"
import AdminLayout from "src/layouts/AdminLayout"
import { Table } from "src/components/Table/Table"
import { handleExternalDataUpdate } from "../../components/Table/helpers"

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  note: string
  phone: string
  createdAt: string
  updatedAt: string
}
interface TableUser {
  id: number
  fullName: string
  email: string
  note: string
  phone: string
  createdAt: string
}

const Users = () => {
  const [users, setUsers] = useState<TableUser[]>([])

  useEffect(() => {
    const getUsers = async () => {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/user?page=1`
      // 'http://13.50.16.182:5000/api/user?page=1'
      // "http://16.171.113.245:5000/api/user?page=1&lookup=323&pageSize=25";

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Barer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
          },
        })

        const usersData: User[] = response.data.rows

        setUsers(
          usersData.map(user => ({
            id: user.id,
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phone: user.phone,
            note: user.note,
            createdAt: user.createdAt,
          }))
        )
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    getUsers()
  }, [])

  const filteringOptions = ["Option 1", "Option 2", "Option 3"]
  const actionOptions = ["Редагувати", "Видалити"]
  const exportOptions = ["Option 1", "Option 2", "Option 3"]
  const paginationOptions = ["Option 1", "Option 2", "Option 3"]

  const customColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      type: "number",
    },
    {
      field: "fullName",
      headerName: "Ім’я",
      width: 130,
      type: "string",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
      type: "string",
      editable: true,
    },
    {
      field: "phone",
      headerName: "Телефон",
      type: "number",
      width: 130,
      editable: true,
    },
    {
      field: "note",
      headerName: "Примітки",
      type: "string",
      width: 130,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Додано",
      type: "string",
      width: 130,
      editable: true,
    },
  ]

  return (
    <AdminLayout>
      <main className={s.main}>
        <section className={s.main__section}>
          <div className={s.main__title}>
            <h2 className={s.main__title_text}>Користувачі</h2>
          </div>
          <div className={s.main__user_search}>
            <div className={s.features}>
              <SearchInput />
              <div className={s.tools}>
                <section className={s.options__container}>
                  <Select
                    options={filteringOptions}
                    icon={<FilterIcon />}
                    toolName={"Фільтрувати"}
                  />
                  <Select options={actionOptions} icon={<ActionsIcon />} toolName={"Дії"} />
                  <Select
                    options={exportOptions}
                    icon={<ExportFileIcon />}
                    toolName={"Експортувати"}
                  />
                </section>
                <Select
                  options={paginationOptions}
                  icon={<RowListIcon />}
                  toolName={"Рядків на сторінці: 10"}
                  style={{ width: "261px" }}
                />
              </div>
            </div>
          </div>

          <Table
            columns={customColumns}
            rows={users}
            onExternalDataUpdate={handleExternalDataUpdate}
          />
        </section>
      </main>
    </AdminLayout>
  )
}

export default Users
