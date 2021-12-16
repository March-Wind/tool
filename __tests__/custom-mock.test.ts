jest.mock('../src/custom-mock/request', () => {
  const users = [{ name: 'Bob' }];
  return () => Promise.resolve(users)
});

import * as user from '../src/custom-mock/user';

// The assertion for a promise must be returned.
it('works with promises', () => {
  expect.assertions(1);
  return user.getUserName(4).then(data => expect(data).toEqual('Mark'));
});