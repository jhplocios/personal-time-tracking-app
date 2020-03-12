import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddActivityDialog from './AddActivityDialog';
import { IActivityData } from '../types';

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
  setList: (input: IActivityData) => void;
}

const ToolbarComponent: React.FC<IToolbarProps> = ({ setList }) => {
  const [openAddDialog, setOpenAddDialog] = React.useState(false);


  const handleClickOpen = () => {
    setOpenAddDialog(true);
  };

  const handleClose = () => {
    setOpenAddDialog(false);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Personal Time Tracker App
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>Add Activity</Button>
        </Toolbar>
      </AppBar>
      <AddActivityDialog 
        open={openAddDialog} 
        handleClose={() => handleClose()} 
        setList={setList}
      />
    </div>
  )
};

export default ToolbarComponent;