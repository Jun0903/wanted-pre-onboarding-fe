import baseURL from './index';

export const createTodo = (data) => {
  return baseURL({
    method: 'POST',
    url: `todos`,
    data
  });
};

export const getTodo = () => {
  return baseURL({
    method: 'GET',
    url: 'todos'
  });
};

export const deleteTodoAPI = (id) => {
  return baseURL({
    method: 'DELETE',
    url: `todos/${id}`
  });
};

export const updateTodo = (props) => {
  const { todoId, data } = props;

  return baseURL({
    method: 'PUT',
    url: `todos/${todoId}`,
    data
  });
};
