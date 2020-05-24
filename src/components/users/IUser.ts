export interface IUser {
  id: string
  name: string
  email: string
  gender?: Gender
  type: UserType
  description?: string
  img?: string
}

export type Gender = 'mail' | 'femail'
export type UserType = 'admin' | 'default'
