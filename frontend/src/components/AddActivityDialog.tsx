import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateInput from './DateInputComponent';
import API from '../utils/api';
import { IActivityData } from '../types';
import { useHistory } from "react-router-dom";

interface AddActivityDialogProps {
  open: boolean;
  handleClose: () => void;
}

const AddActivityDialog: React.FC<AddActivityDialogProps> = ({ open, handleClose }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );
  let history = useHistory();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  // const [isValid, setIsValid] = React.useState(false);

  // React.useEffect(() => {
  //   const regex = RegExp('\d*\u002e{0,1}\d*) (hr|hrs) #(\w*|\d*) (\w*|\d*|\s){1,}', 'g');
  //   //setIsValid(!!inputValue.matchAll(regex);
  //   const match = inputValue.matchAll(regex);
  //   console.log(match)
  // }, [inputValue])
  
  // console.log(isValid)
  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Add Activity 
      </DialogTitle>
      <DialogContent>
        <DateInput selectedDate={selectedDate} handleDateChange={handleDateChange} /> 
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter Activity"
          placeholder="<number> [hr | hrs] #<tag> <activities>"
          type="text"
          onChange={(event) => setInputValue(event.target.value)}
          fullWidth
          //error={isValid}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {
          handleClose();
          API.post('/activity', parseInputValue(inputValue, selectedDate ? selectedDate.toString() : ''));
          setTimeout(() => history.push("/"), 300);
        }} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function parseInputValue(input: string, date: string): Partial<IActivityData> {
  const temp = input.split(" ");
  let count = 0;
  let duration = '';
  let tag = '';
  let name = '';

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
      name += word + " ";
    }
  });

  return {
    duration: Number(duration),
    tag,
    name: name.trimEnd(),
    date: date.toString() || new Date().toString(),
  } 
}

export default AddActivityDialog;