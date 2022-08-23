import React, { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import SignUp from './Auth/Signup';
import TodoList from './Todo/TodoList';

function Router() {
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/todo" element={<TodoList />} />
    </Routes>
  </BrowserRouter>;
}

export default Router;
