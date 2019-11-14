import axios from 'axios';

var address = 'http://localhost:3000';

export function loginUser(loginData) {
  return axios.post(address + '/users/login',loginData);
}
export function registerUser(userData) {
  return axios.post(address + '/users/register',userData);
}