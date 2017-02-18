import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppContainer from './container.jsx';
import HondaStudents from './students.jsx';
import HondaStudentNew from './student.jsx';
import HondaConversations from './conversations.jsx';
import PostNew from './conversation.jsx';
import HondaHome from './home.jsx';
import HondaLogin from './login.jsx';
import { login, isLoggedIn } from './auth.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth(nextState, replace) {
    if (isLoggedIn && nextState.location.pathname !== '/login') {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route
          path="/"
          component={AppContainer}
          onEnter={this.requireAuth}
        >
          <IndexRoute component={HondaHome}/>
          <Route path="login" component={HondaLogin}/>
          <Route path="students" component={HondaStudents}/>
          <Route path="students/new" component={HondaStudentNew}/>
          <Route path="conversations" component={HondaConversations}/>
          <Route path="conversations/new" component={PostNew}/>
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
