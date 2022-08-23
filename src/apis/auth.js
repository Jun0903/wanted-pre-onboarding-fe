import URL from './index';

export const signUpAPI = (data) => {
  return URL({
    method: 'POST',
    url: 'auth/sigunup',
    data
  });
};

export const loginAPI = (data) => {
  return URL({
    method: 'POST',
    url: 'auth/signin',
    data
  });
};
