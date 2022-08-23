import axios from 'axios';

const URL = axios.create({
  baseURL:
    'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/',
  headers: {
    'Content-Type': 'application/json'
  }
});

URL.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      'Bearer ' + localStorage.getItem('access_token');
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default URL;
