export interface IUser {
  id: number
  name: string
  email: string
  gender?: Gender
  type: UserType
}

export type Gender = 'mail' | 'femail'
export type UserType = 'admin' | 'default'
