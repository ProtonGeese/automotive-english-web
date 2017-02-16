import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HondaBar from './bar.jsx';

const AppContainer = (props) => (
  <MuiThemeProvider>
    <div>
      <HondaBar/>
      {props.children}
    </div>
  </MuiThemeProvider>
);

export default AppContainer;
