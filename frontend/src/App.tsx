import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MainView from './views/MainView';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/personal-time-tracker">
          <MainView />
        </Route>
        <Route path="/" render={() => <Redirect to='/personal-time-tracker' />} />
      </Switch>
    </Router>
  );
}

export default App;
