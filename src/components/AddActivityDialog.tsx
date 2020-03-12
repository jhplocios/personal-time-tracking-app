import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IActivityInput } from '../types';

interface AddActivityDialogProps {
  open: boolean;
  setList: (input: IActivityInput) => void;
  handleClose: () => void;
}

const AddActivityDialog: React.FC<AddActivityDialogProps> = ({ open, setList, handleClose }) => {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Add Activity 
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter Activity"
          placeholder="<number> [hr | hrs] #<tag> <activities>"
          type="text"
          onChange={(event) => setInputValue(event.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {
          handleClose();
          setList(parseInputValue(inputValue));
        }} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function parseInputValue(input: string): IActivityInput {
  const temp = input.split(" ");
  let count = 0;
  let duration = '';
  let tag = '';
  let activityName = '';

  temp.forEach(word => {
    if (count === 0) {
      if (word === 'hr' || word === 'hrs') {
        count++;
      } else {
        duration += word;
      }
    } else if (count === 1) {
      if (word[0] === '#') {
        tag = word.slice(1);
        count++;
      }
    } else if (count === 2) {
      activityName += word + " ";
    }
  });

  return {
    duration: Number(duration),
    tag,
    activityName: activityName.trimEnd(),
  } 
}

export default AddActivityDialog;