const sleep = (s: number) => new Promise((resolve) => setTimeout(resolve, s))

export async function login({ email, password }: any) {
  await sleep(500)
  return new Promise((resolve) => {
    resolve({
      id: 123,
      username: 'exampleUser' + password,
      email: email,
    })
  })
}

export async function currentUser(sessionId: string | null) {
  await sleep(500)

  return new Promise((resolve, reject) => {
    if (sessionId === '1') {
      resolve({
        id: 123,
        username: 'exampleUser',
        email: 'example@email.com',
      })
    } else {
      reject(new Error('unauthorized'))
    }
  })
}
