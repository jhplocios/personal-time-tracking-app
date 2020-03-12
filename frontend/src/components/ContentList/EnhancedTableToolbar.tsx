import React from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import DateInput from '../DateInputComponent';

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
  selectedIds: number[];
  selectedDate: Date | null;
  onDelete: () => void;
  setList: (ids: number[]) => void;
  handleDateChange: (date: Date | null) => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { selectedIds, setList, onDelete, selectedDate, handleDateChange } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: selectedIds.length > 0,
      })}
    >
      {selectedIds.length > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {selectedIds.length} selected
        </Typography>
      ) : (
        <SubHeaderContainer>
          <Typography className={classes.title} variant="h6" id="tableTitle">
            Activities on
          </Typography>
          <DateInput selectedDate={selectedDate} handleDateChange={handleDateChange} />
        </SubHeaderContainer>
      )}
      {selectedIds.length > 0 && (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => {
            onDelete();
            setList(selectedIds);
          }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;