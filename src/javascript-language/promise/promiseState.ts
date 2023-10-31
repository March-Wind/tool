type PromiseState = 'pending' | 'fulfilled' | 'rejected'
/**
 * 获取Promise状态
 * @param {Promise<unknown>} p
 * @return {*}  {Promise<PromiseState>}
 */
const promiseState = function (p: Promise<unknown>): Promise<PromiseState> {
  const t = {};
  return Promise.race([p, t])
    .then(v => (v === t) ? "pending" : "fulfilled", () => "rejected");
}
export default promiseState;
// const a = Promise.resolve();
// const b = Promise.reject();
// const c = new Promise(() => { });

// promiseState(a).then(state => console.log(state)); // fulfilled
// promiseState(b).then(state => console.log(state)); // rejected
// promiseState(c).then(state => console.log(state)); // pending
