import request from './request';

export function getUserName(userID) {
  //@ts-ignore
  return request('/users/' + userID).then(user => user.name);
}