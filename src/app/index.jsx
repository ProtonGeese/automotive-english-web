import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppContainer from './container.jsx';
import HondaStudents from './students.jsx';
import HondaStudentNew from './student.jsx';
import HondaConversations from './conversations.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <Router history={hashHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="/" component={HondaStudents}/>
      <Route path="students" component={HondaStudents}/>
      <Route path="students/new" component={HondaStudentNew}/>
      <Route path="conversations" component={HondaConversations}/>
    </Route>
  </Router>
);

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
