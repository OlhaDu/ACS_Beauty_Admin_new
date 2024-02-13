import { IPatchUser } from "src/types/users/IPatchUser"
import { instance } from "../instance"

export const usersApi = {
  patchUser: (updatedUsers: IPatchUser) => instance.patch(`user/${updatedUsers.id}`, updatedUsers),
}
