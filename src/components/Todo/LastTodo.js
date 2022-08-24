import React, { useState } from 'react';
import { updateTodo, deleteTodoAPI } from '../../apis/todo';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import styled from 'styled-components';

const LastTodo = (props) => {
  const [todo, setTodo] = useState(props.todo);
  const [editedTodo, setEditedTodo] = useState(props.todo);
  const [isCompleted, setIsCompleted] = useState(props.isCompleted);
  const [editMode, setEditMode] = useState(false);

  const todoChangeHandler = (e) => {
    setEditedTodo(e.target.value);
  };

  const updateIsCompleted = () => {
    const newTodo = {
      todo: todo,
      isCompleted: !isCompleted
    };
    updateTodo(newTodo, props.id).then((response) => {
      if (response.ok) {
        setIsCompleted(!isCompleted);
      }
    });
  };

  const editModeHandler = () => {
    setEditMode(!editMode);
    if (todo !== editedTodo) {
      setEditedTodo(todo);
    }
  };

  const updateTodoAndComplete = () => {
    const newTodo = {
      todo: editedTodo,
      isCompleted
    };
    updateTodo(newTodo, props.id).then((response) => {
      if (response.ok) {
        setEditMode(false);
        setTodo(editedTodo);
      }
    });
  };

  const deleteTodo = () => {
    deleteTodoAPI(props.id).then((response) => {
      if (response.ok) {
        props.renderTodos();
      }
    });
  };

  const doneTodo = isCompleted ? 'doneTodo' : 'todo';

  return (
    <Container>
      {!editMode ? (
        <Li>
          <Checkbox
            checked={isCompleted}
            color="default"
            onChange={updateIsCompleted}
            value={isCompleted}
          />
          <p className={doneTodo}>{todo}</p>
          <div className="btns">
            <IconButton onClick={editModeHandler}>
              <EditRoundedIcon />
            </IconButton>
            <IconButton onClick={deleteTodo}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Li>
      ) : (
        <Li>
          <Checkbox checked={isCompleted} color="default" />
          <TextField
            className="editTodo"
            fullWidth
            value={editedTodo}
            onChange={todoChangeHandler}
            variant="standard"
          />
          <div className="btns">
            <IconButton size="small" onClick={updateTodoAndComplete}>
              <CheckIcon />
            </IconButton>
            <IconButton size="small" onClick={editModeHandler}>
              <CloseRoundedIcon />
            </IconButton>
          </div>
        </Li>
      )}
    </Container>
  );
};

export default LastTodo;

const Container = styled.div`
  width: 100%;
`;

const Li = styled.div`
  height: 4rem;
  padding: 0.2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .todo {
    padding: 0;
    word-break: break-all;
  }

  .doneTodo {
    color: #d9d9db;
    text-decoration: line-through;
  }

  .editTodo {
    max-width: 70%;
    virtical-align: center;
  }

  .btns {
    margin: auto 0;
  }
`;
