export function login({ email, password }: any) {
  console.log(password)
  return new Promise((resolve) => {
    resolve({
      id: 123,
      username: 'exampleUser',
      email: email,
    })
  })
}
