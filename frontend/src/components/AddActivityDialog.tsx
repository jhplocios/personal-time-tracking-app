import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateInput from './DateInputComponent';
import API from '../utils/api';
import { fnParseInputValue } from '../utils/helpers';

interface AddActivityDialogProps {
  open: boolean;
  handleClose: () => void;
}

const AddActivityDialog: React.FC<AddActivityDialogProps> = ({ open, handleClose }) => {
  let history = useHistory();
  const [inputValue, setInputValue] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleAddActivity = () => {
    const jwtoken = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const config = {
      headers: { Authorization: `Bearer ${jwtoken}` }
    }; 
    const parsedInput = fnParseInputValue(inputValue, selectedDate ? selectedDate.toString() : '')
    API.post('/activity', { ...parsedInput, user: userId }, config)
      .then(res => {
        if (res) {
          history.push("/");
        }
      })
      .catch(err => console.log(err))
    handleClose();
  }

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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={handleAddActivity} 
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddActivityDialog;