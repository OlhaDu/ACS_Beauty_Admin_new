export interface IUser {
  id: number
  fullName: string
  firstName: string
  lastName: string
  note: string
  email: string
  phone: string
  createdAt: string
}

export interface IUpdatedUser {
  firstName: string
  lastName: string
  note: string
  email: string
  phone: string
}
