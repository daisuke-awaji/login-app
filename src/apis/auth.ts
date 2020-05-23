import { IUser } from 'components/users/IUser'

const sleep = (s: number) => new Promise((resolve) => setTimeout(resolve, s))

export async function login({ email, password }: any): Promise<IUser> {
  await sleep(500)
  return new Promise((resolve, reject) => {
    if (email === 'usera@email.com' && password === 'a') {
      resolve({
        id: 123,
        name: 'John Scott',
        email: email,
        type: 'admin',
      })
    } else if (email === 'userb@email.com' && password === 'b') {
      resolve({
        id: 456,
        name: 'Marty',
        email: email,
        type: 'default',
      })
    } else {
      reject(new Error('email or password is not valid'))
    }
  })
}

export async function currentUser(sessionId: string | null): Promise<IUser> {
  await sleep(500)

  return new Promise((resolve, reject) => {
    if (sessionId === '1') {
      resolve({
        id: 123,
        name: 'John Scott',
        email: 'example@email.com',
        type: 'admin',
      })
    } else {
      reject(new Error('unauthorized'))
    }
  })
}
