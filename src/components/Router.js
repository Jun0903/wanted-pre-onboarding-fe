import React, { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import TodoList from './Todo/TodoList';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
