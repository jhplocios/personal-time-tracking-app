import React from 'react';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import styled from 'styled-components';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import DateInput from '../DateInputComponent';
import API from '../../utils/api';

const SubHeaderContainer = styled.div`
  display: flex;
  align-items: baseline;
`

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  selectedId: string;
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  let history = useHistory();
  const classes = useToolbarStyles();
  const { selectedId, selectedDate, handleDateChange } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: !!selectedId,
      })}
    >
      {!!selectedId ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          1 selected
        </Typography>
      ) : (
        <SubHeaderContainer>
          <Typography className={classes.title} variant="h6" id="tableTitle">
            Activities on
          </Typography>
          <DateInput selectedDate={selectedDate} handleDateChange={handleDateChange} />
        </SubHeaderContainer>
      )}
      {!!selectedId && (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => {
            API.delete(`/activity/${selectedId}`);
            setTimeout(() => history.push("/"), 200);
          }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;