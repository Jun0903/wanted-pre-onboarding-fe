import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { getTodo } from '../../apis/todo';
import MakeTodo from './MakeTodo';
import LastTodo from './LastTodo';

const TodoList = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState();

  useEffect(() => {
    const token = !!localStorage.getItem('access_token');
    if (!token) {
      navigate('/');
    }
  });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(
          'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos',
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        );
        console.log(response.data);
        setTodos(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTodo();
  }, []);

  const renderTodos = async () => {
    await getTodo()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      });
  };

  return (
    <Container>
      <h1>해야할 일</h1>
      <MakeTodo renderTodos={renderTodos} />
      <Wrapper>
        <Ul>
          {todos.length > 0 &&
            todos.map((todo) => {
              return (
                <LastTodo
                  key={todo.id}
                  id={todo.id}
                  todo={todo.todo}
                  isCompleted={todo.isCompleted}
                  renderTodos={renderTodos}
                />
              );
            })}
          {todos.length === 0 && <Caption>할 일을 등록하세요!</Caption>}
        </Ul>
      </Wrapper>
    </Container>
  );
};

export default TodoList;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f2f2f2;
  .title {
    text-align: center;
    padding-top: 8rem;
    padding-bottom: 2rem;
  }
`;

const Wrapper = styled.div`
  width: 30%;
  border-radius: 5px;
  background-color: #fff;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const Ul = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const Caption = styled.div`
  text-align: center;
  padding: 1rem;
`;
