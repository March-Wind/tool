type PromiseArr = () => Promise<unknown>[]
const chain = (PromiseArr: PromiseArr) => {
  for (const promiseFn of PromiseArr) {
    yield promiseFn
  }

  return new Promise(() => {

  })
}