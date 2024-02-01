import { useEffect, useState } from "react"
import s from "./Users.module.scss"

import Select from "src/components/ToolsPanel/Select/Select"
import SearchInput from "src/components/ToolsPanel/SearchInput/SearchInput"
import FilterIcon from "../../images/svg/FilterIcon"
import AdminLayout from "src/layouts/AdminLayout"
import Table from "src/components/Table/Table"

import { usersApi } from "../../api/usersApi.ts"
import ExportButton from "../../components/ToolsPanel/ExportButton/ExportButton.tsx"
import { IUpdatedUser, IUser } from "../../types/IUsers.ts"
import EditIcon from "../../images/svg/EditIcon.tsx"
import DeleteIcon from "../../images/svg/DeleteIcon.tsx"
import * as React from "react"
import ChangeUsersInfoPopup from "../../components/Popups/ChangeUsersInfoPopup/ChangeUsersInfoPopup.tsx"
import InfoPopup from "../../components/Popups/InfoPopup/InfoPopup.tsx"

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState("")
  const [chosenUser, setChosenUser] = useState<IUser | undefined>()

  const fetchUsers = async () => {
    try {
      const response = await usersApi.getUsers({ page: 1, pageSize: 10 })
      const usersData: IUser[] = response.data.rows
      setUsers(
        usersData.map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          note: user.note,
          createdAt: user.createdAt,
        }))
      )
    } catch (error) {
      console.error("Error fetching orders", error)
    }
  }

  const patchUser = async (user: IUpdatedUser) => {
    if (chosenUser) {
      try {
        await usersApi.patchUser(chosenUser.id, user)
        setShowSuccessPopup("Інформація про користувача успішно змінена")
        fetchUsers()
        setTimeout(() => setShowSuccessPopup(""), 2000)
      } catch (error) {
        console.error("Error patching user", error)
        setShowSuccessPopup("Щось пішло не так. Спробуйте піздніше.")
      }
    }
  }

  const deleteUser = async (id: number) => {
    try {
      await usersApi.deleteUser(id)
      setShowSuccessPopup("Користувач успішно видален")
      fetchUsers()
      setTimeout(() => setShowSuccessPopup(""), 2000)
    } catch (error) {
      console.error("Error deleting user", error)
      setShowSuccessPopup("Щось пішло не так. Спробуйте піздніше.")
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filteringOptions = ["Option 1", "Option 2", "Option 3"]

  const customColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      type: "number",
    },
    {
      field: "fullName",
      headerName: "Ім’я",
      width: 150,
      type: "string",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      type: "string",
      editable: true,
    },
    {
      field: "phone",
      headerName: "Телефон",
      type: "number",
      width: 140,
      editable: true,
    },
    {
      field: "note",
      headerName: "Примітки",
      type: "string",
      width: 170,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Додано",
      type: "string",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "ДіЇ",
      width: 120,
      renderCell: (params: { row: IUser }) => (
        <div className={s.actionButtons}>
          <button onClick={() => handleshowUpdateUserModal(params.row)}>
            <EditIcon className={s.svg} fill="black" />
          </button>
          <button onClick={() => deleteUser(params.row.id)}>
            <DeleteIcon className={s.svg} fill="black" />
          </button>
        </div>
      ),
      headerClassName: s.headerCell,
    },
  ]

  const handleEditUser = (user: IUpdatedUser) => {
    patchUser(user)
    handleHideUpdateUserModal()
  }

  const handleshowUpdateUserModal = (user: IUser) => {
    setShowUpdateUserModal(true)
    setChosenUser(user)
  }

  const handleHideUpdateUserModal = () => {
    setShowUpdateUserModal(false)
    setChosenUser(undefined)
  }

  const searchUsers = () => {
    console.log("search")
  }

  return (
    <AdminLayout>
      <main className={s.main}>
        <section className={s.main__section}>
          <div className={s.main__title}>
            <h2 className={s.main__title_text}>Користувачі</h2>
          </div>
          <div className={s.tools}>
            <SearchInput onChange={searchUsers} />
            <ExportButton columns={customColumns} rows={users} />
          </div>
          <Table columns={customColumns} rows={users} />
        </section>
        {showUpdateUserModal && chosenUser && (
          <ChangeUsersInfoPopup
            onClose={handleHideUpdateUserModal}
            onSuccess={handleEditUser}
            user={chosenUser}
          />
        )}
        {showUpdateUserModal && chosenUser && (
          <ChangeUsersInfoPopup
            onClose={handleHideUpdateUserModal}
            onSuccess={handleEditUser}
            user={chosenUser}
          />
        )}
        {showSuccessPopup !== "" && (
          <InfoPopup onClose={() => setShowSuccessPopup("")}>{showSuccessPopup}</InfoPopup>
        )}
      </main>
    </AdminLayout>
  )
}

export default Users
