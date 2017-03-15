import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppContainer from './container.jsx';
import HondaStudents from './students.jsx';
import HondaStudentNew from './student.jsx';
import HondaStudentEdit from './student_edit.jsx';
import HondaConversations from './conversations.jsx';
import PostNew from './conversation.jsx';
import HondaHome from './home.jsx';
import HondaLogin from './login.jsx';
import HondaLessons from './lessons.jsx';
import HondaLessonsNew from './lessons_new.jsx';
import { isLoggedIn, resume } from './models/auth.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  requireAuthEnter = (nextState, replace) => {
    if (!isLoggedIn()) {
      replace('/login');
    }
  }

  requireAuthChange = (prevState, nextState, replace) => {
    if (!isLoggedIn()) {
      replace('/login');
    }
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/login" component={AppContainer}>
          <IndexRoute component={HondaLogin}/>
        </Route>
        <Route
          path="/"
          component={AppContainer}
          onEnter={this.requireAuthEnter}
          onChange={this.requireAuthChange}
        >
          <IndexRoute component={HondaHome}/>
          <Route path="students" component={HondaStudents}/>
          <Route path="students/new" component={HondaStudentNew}/>
          <Route path="students/:userId/edit" component={HondaStudentEdit}/>
          <Route path="conversations" component={HondaConversations}/>
          <Route path="conversations/new" component={PostNew}/>
          <Route path='lessons' component={HondaLessons}/>
          <Route path='lessons/new' component={HondaLessonsNew}/>
        </Route>
      </Router>
    );
  }
}

function main() {
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  );
}

/*
 * Try resuming an existing session.
 * Errors are handled downstream so we take the same action whether we hit an
 * error or not.
 */
resume({
  onSuccess: main,
  onFailure: main
});
