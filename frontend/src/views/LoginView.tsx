import React from 'react';
import styled from 'styled-components';
import Toolbar from '../components/ToolbarComponent';
import LoginForm from '../components/LoginFormComponent';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #eaeaea;
`

const FormContainer = styled.div`
  display: grid;
  place-content: center;
  width: 100%;
  height: calc(100vh - 64px);
`
const LoginView: React.FC = () => (
  <Container>
    <Toolbar isLoggedOut />
    <FormContainer>
      <LoginForm />
    </FormContainer>
  </Container>
);

export default LoginView;
