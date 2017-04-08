import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppContainer from './container.jsx';

import TraVerseStudents from './students.jsx';
import TraVerseStudentNew from './students_new.jsx';
import TraVerseStudentEdit from './students_edit.jsx';

import TraVerseInstructors from './instructors.jsx';
import TraVerseInstructorNew from './instructors_new.jsx';
import TraVerseInstructorEdit from './instructors_edit.jsx';

import TraVerseConversations from './conversations.jsx';
import PostNew from './conversation.jsx';
import TraVerseHome from './home.jsx';
import TraVerseLogin from './login.jsx';
import TraVerseLessons from './lessons.jsx';
import TraVerseLessonsNew from './lessons_new.jsx';
import TraVerseLessonsEdit from './lessons_edit.jsx';

import TraVerseSegments from './segments.jsx';
import TraVerseSegmentsNew from './segments_new.jsx';
import TraVerseSegmentsEdit from './segments_edit.jsx';

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
          <IndexRoute component={TraVerseLogin}/>
        </Route>
        <Route
          path="/"
          component={AppContainer}
          onEnter={this.requireAuthEnter}
          onChange={this.requireAuthChange}
        >
          <IndexRoute component={TraVerseHome}/>
          <Route path="students" component={TraVerseStudents}/>
          <Route path="students/new" component={TraVerseStudentNew}/>
          <Route path="students/:userId/edit" component={TraVerseStudentEdit}/>
          <Route path="instructors" component={TraVerseInstructors}/>
          <Route path="instructors/new" component={TraVerseInstructorNew}/>
          <Route path="instructors/:userId/edit" component={TraVerseInstructorEdit}/>
          <Route path="conversations" component={TraVerseConversations}/>
          <Route path="conversations/new" component={PostNew}/>
          <Route path='lessons' component={TraVerseLessons}/>
          <Route path='lessons/new' component={TraVerseLessonsNew}/>
          <Route path='lessons/:lessonId/edit' component={TraVerseLessonsEdit}/>
          <Route path='lessons/:lessonId/segments' component={TraVerseSegments}/>
          <Route path='lessons/:lessonId/segments/new' component={TraVerseSegmentsNew}/>
          <Route path='lessons/:lessonId/segments/:segmentId/edit' component={TraVerseSegmentsEdit}/>
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
