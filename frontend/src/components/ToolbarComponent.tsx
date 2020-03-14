import React from 'react';
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddActivityDialog from './AddActivityDialog';
import API from '../utils/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

interface IToolbarProps {
  isNewUser?: boolean;
  isLoggedOut?: boolean;
  setUser?: () => void;
}

const ToolbarComponent: React.FC<IToolbarProps> = ({ isLoggedOut, setUser, isNewUser }) => {
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  let history = useHistory();

  const handleClickOpen = () => {
    setOpenAddDialog(true);
  };

  const handleClose = () => {
    setOpenAddDialog(false);
  };

  const handleLogOut = () => {
    const jwtoken = localStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${jwtoken}` }
    }; 
    API.post('/user/me/logout', {}, config)
      .then(res => {
        history.push("/personal-time-tracker");
        localStorage.clear();
      })
      .catch(err => console.log(err))
  }

  const classes = useStyles();
  const userFirstName = localStorage.getItem('firstName'); 

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {userFirstName ? `Welcome back, ${userFirstName}!` : 'Personal Time Tracker App'}
          </Typography>
          {!isLoggedOut && <Button color="inherit" onClick={handleClickOpen}>Add Activity</Button>}
          {isLoggedOut && 
            <Button color="inherit" onClick={() => setUser && setUser()}>
              {!isNewUser ? 'Sign in' : ' Log in'}
            </Button>}
          {!isLoggedOut && <Button color="inherit" onClick={handleLogOut}>Log out</Button>}
        </Toolbar>
      </AppBar>
      <AddActivityDialog 
        open={openAddDialog} 
        handleClose={() => handleClose()} 
      />
    </div>
  )
};

export default ToolbarComponent;