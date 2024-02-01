import { instance } from "./instance.tsx"
import { IUpdatedUser } from "../types/IUsers.ts"

export const usersApi = {
  getUsers({ page = 1, pageSize = 10, lookup = "" }) {
    return instance.get(
      `user?page=${page}&pageSize=${pageSize}${lookup ? `&lookup=${lookup}` : ""}`
    )
  },

  patchUser(id: number, data: IUpdatedUser) {
    return instance.patch(`user/${id}`, data)
  },

  deleteUser(id: number) {
    return instance.delete(`user/${id}`)
  },
}
