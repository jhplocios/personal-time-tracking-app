import React from 'react';
import styled from 'styled-components';
import ErrorIcon from '@material-ui/icons/Error';
import { Typography } from '@material-ui/core';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  padding-bottom: 200px;
`

const StyledErrorIcon = styled(ErrorIcon)`
  margin-right: 20px
`

const NoDataView: React.FC = () => (
  <Container>
    <StyledErrorIcon fontSize='large'/>
    <Typography>No Data Found</Typography>
  </Container>
)

export default NoDataView;