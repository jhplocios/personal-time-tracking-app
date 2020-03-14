import axios from 'axios';

export default axios.create({
  baseURL: 'https://personal-time-tracker-server.herokuapp.com/'
  // baseURL: `http://localhost:5000/`
});