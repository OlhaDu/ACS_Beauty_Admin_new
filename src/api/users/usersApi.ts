import { IUpdateUser } from "src/types/users/IUpdateUser"
import { instance } from "../instance"

export const usersApi = {
  updateUser: (updatedUsers: IUpdateUser) =>
    instance.patch(`user/${updatedUsers.id}`, updatedUsers),
}
