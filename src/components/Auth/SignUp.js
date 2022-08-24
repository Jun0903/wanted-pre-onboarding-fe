import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpAPI } from '../../apis/auth';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const regexEmail =
  // eslint-disable-next-line
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const regexPw =
  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const emailInputHandler = (e) => {
    const writeEmail = e.target.value;
    setEmail(writeEmail);
    if (regexEmail.test(email)) {
      setIsEmailValid(true);
    }
  };

  const passwordInputHandler = (e) => {
    const writePassword = e.target.value;
    setPassword(writePassword);
    if (regexPw.test(password)) {
      setIsPasswordValid(true);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    };

    signUpAPI(user);
    navigate('/');
  };

  return (
    <Container>
      <Typography component="h1" variant="h5">
        SignUp
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={onSubmitHandler}
      >
        <TextField
          margin="normal"
          label="Email Address"
          required
          fullWidth
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={emailInputHandler}
        />
        <TextField
          margin="normal"
          label="password"
          type="password"
          required
          fullWidth
          autoComplete="current-password"
          placeholder="8자 이상, 숫자, 문자, 특수문자를 포함해주세요."
          value={password}
          onChange={passwordInputHandler}
        />
        {isEmailValid && isPasswordValid ? (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            가입하기
          </Button>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled
          >
            가입하기
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default SignUp;

const Container = styled.div`
  width: 30%;
  text-align: center;
  margin: 0 auto;
  padding-top: 10rem;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;
