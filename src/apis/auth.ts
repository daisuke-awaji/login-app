export async function login({ email, password }: any) {
  //   const sleep = (s: number) => new Promise((resolve) => setTimeout(resolve, s))
  //   await sleep(1000)
  return new Promise((resolve) => {
    resolve({
      id: 123,
      username: 'exampleUser' + password,
      email: email,
    })
  })
}
