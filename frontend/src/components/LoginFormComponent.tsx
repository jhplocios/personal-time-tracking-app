import React from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from '../utils/api';

const Card = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 5px;
`

const Spacer = styled.div`
  height: 10px;
  width: 100%;
`

const LoginFormComponent: React.FC = () => {
  let history = useHistory();
  const [emailInput, setEmailInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');

  const handleLogIn = () => {
    API.post('/user/login', { email: emailInput, password: passwordInput })
      .then(res => {
        if (res.data) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('firstName', res.data.user.firstName);
          localStorage.setItem('userId', res.data.user._id);
        }
      })
      .catch(err => console.log(err))
    setTimeout(() => history.push("/personal-time-tracker"), 1000);
  };

  return (
    <Card>
      <TextField
        onChange={(event) => setEmailInput(event.target.value)}
        required
        id="outlined-required"
        placeholder="Email"
        variant="outlined"
        fullWidth
      />
      <Spacer />
      <TextField
        onChange={(event) => setPasswordInput(event.target.value)}
        required
        id="outlined-required"
        label="Password"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        variant="outlined"
        fullWidth
      />
      <Spacer />
      <Button 
        variant="contained"
        color="primary"
        onClick={handleLogIn} 
      >
        Log In
      </Button>
    </Card>
  )
};

export default LoginFormComponent;
