import baseURL from '.';

export const signUpAPI = (data) => {
  return baseURL({
    method: 'POST',
    url: `auth/signup`,
    data
  });
};

export const loginAPI = (data) => {
  return baseURL({
    method: 'POST',
    url: 'auth/signin',
    data
  });
};
