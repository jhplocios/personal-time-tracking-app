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

const SigninFormComponent: React.FC = () => {
  let history = useHistory();
  const [firstNameInput, setfirstNameInput] = React.useState('');
  const [lastNameInput, setLastNameInput] = React.useState('');
  const [roleInput, setRoleInput] = React.useState('');
  const [emailInput, setEmailInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');

  const handleSignIn = () => {
    API.post('/user', {
      firstName: firstNameInput,
      lastName: lastNameInput,
      role: roleInput, 
      email: emailInput, 
      password: passwordInput 
    }).then(res => {
        if (res.data) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('firstName', res.data.user.firstName);
          localStorage.setItem('userId', res.data.user._id);
        }
      })
      .catch(err => console.log(err))
    setTimeout(() => history.push("/personal-time-tracker"), 1000);
  }

  return (
    <Card>
      <TextField
        onChange={(event) => setfirstNameInput(event.target.value)}
        required
        id="outlined-required"
        placeholder="First Name"
        variant="outlined"
        fullWidth
      />
      <Spacer />
      <TextField
        onChange={(event) => setLastNameInput(event.target.value)}
        required
        id="outlined-required"
        placeholder="Last Name"
        variant="outlined"
        fullWidth
      />
      <Spacer />
      <TextField
        onChange={(event) => setRoleInput(event.target.value)}
        required
        id="outlined-required"
        placeholder="Role"
        variant="outlined"
        fullWidth
      />
      <Spacer />
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
        onClick={handleSignIn} 
      >
        Sign In
      </Button>
    </Card>
  )
};

export default SigninFormComponent;
