import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

interface IDateInputProps {
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
}

const DateInputComponent: React.FC<IDateInputProps> = ({ selectedDate, handleDateChange }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      margin="normal"
      id="date-picker-dialog"
      format="MM/dd/yyyy"
      value={selectedDate}
      onChange={handleDateChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  </MuiPickersUtilsProvider>
)

export default DateInputComponent;