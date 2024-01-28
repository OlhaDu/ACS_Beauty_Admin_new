export interface IProfileTypes {
  firstName: string
  lastName: string
  phone: string
  email: string
  avatar: string | null
  password: string
  newpassword: string
  confirmpass: string
  onShowPass: boolean
  onClickShowPass: (show: boolean) => void
}

export interface InitialValues {
  initialValues: IProfileTypes
}
