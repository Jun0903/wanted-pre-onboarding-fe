import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTodo } from '../../apis/todo';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styled from 'styled-components';

const MakeTodo = (props) => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState('');

  const todoChangeHandler = (e) => {
    setTodo(e.target.value);
  };

  const makeTodo = () => {
    const data = {
      todo
    };
    createTodo(data)
      .then((response) => {
        if (response.ok) {
          props.renderTodos();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setTodo('');
    navigate('/todo');
  };

  return (
    <Container>
      <TextField
        fullWidth
        value={todo}
        variant="standard"
        onChange={todoChangeHandler}
        placeholder="할 일이 무엇인가요?"
      />
      <IconButton onClick={makeTodo} color="primary">
        <AddCircleIcon />
      </IconButton>
    </Container>
  );
};

export default MakeTodo;

const Container = styled.div`
  width: 30%
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  background-color: #fff;
  @media screen and (max-width: 768px) {
    width: 80%;
  }  
`;
