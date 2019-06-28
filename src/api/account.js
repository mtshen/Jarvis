import axios from 'axios'

// 登陆
export function login (username, password) {
  return axios({
    method: 'post',
    url: '/login',
    data: { username, password }
  })
};

// 登出
export function loginOut (username, password) {
  return axios({
    method: 'post',
    url: '/login',
    data: { username, password }
  })
};
