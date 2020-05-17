import { IUser } from 'components/users/IUser'

const sleep = (s: number) => new Promise((resolve) => setTimeout(resolve, s))

export async function login({ email, password }: any): Promise<IUser> {
  await sleep(500)
  return new Promise((resolve) => {
    resolve({
      id: 123,
      name: 'exampleUser' + password,
      email: email,
    })
  })
}

export async function currentUser(sessionId: string | null): Promise<IUser> {
  await sleep(500)

  return new Promise((resolve, reject) => {
    if (sessionId === '1') {
      resolve({
        id: 123,
        name: 'exampleUser',
        email: 'example@email.com',
      })
    } else {
      reject(new Error('unauthorized'))
    }
  })
}
