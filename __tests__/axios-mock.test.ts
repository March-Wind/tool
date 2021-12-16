import axios from 'axios';
import { getUserName } from '../src/axios-mock/user';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>
test('should fetch users', () => {
  const users = [{ name: 'Bob' }];
  const resp = { data: users };
  mockedAxios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return getUserName().then(data => expect(data).toEqual(users));
});