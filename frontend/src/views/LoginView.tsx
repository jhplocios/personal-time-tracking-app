import React from 'react';
import styled from 'styled-components';
import Toolbar from '../components/ToolbarComponent';
import LoginForm from '../components/LoginFormComponent';
import SigninForm from '../components/SigninFormComponent';

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
const LoginView: React.FC = () => {
  const [isNewUser, setIsNewUser] = React.useState(false);

  React.useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Container>
      <Toolbar isNewUser={isNewUser} setUser={() => setIsNewUser(!isNewUser)} isLoggedOut />
      <FormContainer>
        {isNewUser ? <SigninForm /> : <LoginForm />}
      </FormContainer>
    </Container>
  )
};

export default LoginView;
