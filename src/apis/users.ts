// mock

import { IUser } from 'components/users/IUser'

export const fetchUsers = (): Promise<IUser[]> => {
  return new Promise((resolve) => {
    resolve([
      { id: 1, name: 'John', email: 'john@email.com' },
      { id: 2, name: 'Bob', email: 'bob@email.com' },
      { id: 3, name: 'Mark', email: 'mark@email.com' },
    ])
  })
}
