import { IUser } from 'components/users/IUser'
import { users } from 'apis/users'
import { sleep } from './utils'

export async function login({ email, password }: any): Promise<IUser> {
  await sleep(500)
  return new Promise((resolve, reject) => {
    if (email === 'usera@email.com' && password === 'a') {
      resolve(users[0])
    } else if (email === 'userb@email.com' && password === 'b') {
      resolve(users[1])
    } else {
      reject(new Error('email or password is not valid'))
    }
  })
}

export async function currentUser(sessionId: string | null): Promise<IUser> {
  await sleep(500)

  return new Promise((resolve, reject) => {
    if (sessionId === '1') {
      resolve(users[0])
    } else if (sessionId === '2') {
      resolve(users[1])
    } else {
      reject(new Error('unauthorized'))
    }
  })
}
