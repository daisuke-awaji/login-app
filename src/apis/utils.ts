export const sleep = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s))
