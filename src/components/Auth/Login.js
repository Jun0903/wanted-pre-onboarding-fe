import { FormControlLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import { loginAPI } from '../../apis/auth';

const regexEmail =
  // eslint-disable-next-line
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const regexPw =
  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

function Login() {
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

  const submitSignin = async (props) => {
    try {
      await loginAPI(props).then((res) => {
        localStorage.setItem('access_token', res.data.access_token);
        navigate('/todo');
      });
    } catch (e) {
      console.log(e);
    }
  };

  // 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      navigate('/todo');
    }
  }, []);

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        component="form"
        noValidate
        onSubmit={submitSignin}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {isEmailValid && isPasswordValid ? (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => submitSignin({ email: email, password: password })}
          >
            로그인
          </Button>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled
            onClick={() => submitSignin({ email: email, password: password })}
          >
            로그인
          </Button>
        )}
        <Link to="/signUp">회원가입 먼저하기</Link>
      </Box>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 30%;
  text-align: center;
  margin: 0 auto;
  padding-top: 10rem;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;
