import axios from 'axios';
export function getUserName() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return axios.get('/users.json').then(resp => resp.data);
}