import { IUpdateUsers } from "src/types/users/IUpdateUsers"
import { instance } from "./instance"

export const usersApi = {
  updateUsers: (updatedUsers: IUpdateUsers) =>
    instance.patch(`user/${updatedUsers.id}`, updatedUsers),
}
