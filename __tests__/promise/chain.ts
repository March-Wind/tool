import { chain } from '../../src/tools/promise/chain';



describe('promise.chain', () => {
  test('1', (done) => {
    const prom1 = () => Promise.resolve(1)
    const prom2 = () => Promise.resolve(2);
    const prom3 = () => Promise.resolve(3)
    chain([prom1(), prom2(), prom3()]);
    // prom1.mockResolvedValueOnce(1);
    // prom2.mockResolvedValueOnce(2);
    // prom3.mockResolvedValueOnce(3);
    debugger
    done();
  })
})



