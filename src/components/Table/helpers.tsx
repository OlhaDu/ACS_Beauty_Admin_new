import { useEffect } from "react"
import { usersApi } from "src/api/users/usersApi"

interface IUserData {
  id: number
  fullName: string
  emai: string
  phone_number: string
  note: string
  createdAt: string
}

export const handleExternalDataUpdate = async (updatedRowData: IUserData) => {
  useEffect(() => {
    const updateUsers = async () => {
      try {
        const response = await usersApi.updateUsers(updatedRowData)
      } catch (error) {
        ;``
        console.error("Error fetching data:", error)
      }
    }

    // Log the updated data
    console.log("Handling updated row data in external file:", updatedRowData)

    updateUsers()
  }, [])
}
