import URL from './index';

const token = localStorage.getItem('token');

export const createTodo = (todo) =>
  fetch(`${URL}/todos/`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });

export const getTodo = async () =>
  fetch(`${URL}/todos`, {
    headers: {
      Authorization: 'Bearer' + token
    }
  });

export const deleteTodo = async (id) =>
  fetch(`${URL}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer' + token,
      'Content=Type': 'application/json'
    }
  });

export const updateTodo = async (newTodo, id) =>
  fetch(`${URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTodo)
  });
