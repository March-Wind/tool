import request from './request';

export function getUserName(userID: number) {
  return request('/users/' + userID).then((user: any) => user.name);
}


