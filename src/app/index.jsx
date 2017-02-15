import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import HondaBar from './bar.jsx';
import HondaTabs from './tabs.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <div>
      <HondaBar/>
      <HondaTabs/>
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
