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

// 查询当前天气或未来天气
export function aMapWeatherWeatherInfo (city, extensions = 'base') {
  const key = 'b67f628ffc6474eab2c6574921fd06b1'
  const output = 'JSON'

  return axios({
    url: 'https://restapi.amap.com/v3/weather/weatherInfo',
    params: { key, extensions, output, city },
    method: 'get'
  })
};
