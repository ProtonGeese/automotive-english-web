import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fade } from 'material-ui/utils/colorManipulator'; 
import Paper from 'material-ui/Paper';
import TraVerseBar from './bar.jsx';

const paper_style = {
  'maxWidth': '80rem',
  'margin': 'auto',
  'padding': '2rem',
  'marginTop': '1rem'
};

const container_style = {
  'display': 'flex',
  'flexDirection': 'column',
  'minHeight': '100vh'
};

const footer_style = {
  'marginTop': 'auto',
  'textAlign': 'center',
  'height': '4rem',
  'background': '#212121',
  'color': '#FAFAFA',
};

const cc_style = {
  'margin': '0rem',
  'padding': '0rem',
  'marginTop': '1.5rem'
};

const muiTheme = getMuiTheme({
  fontFamily: 'proximanova,Arial,sans-serif',
  palette: {
    primary1Color: '#bb0000',
    primary2Color: '#830000',
    primary3Color: '#949494',
    accent1Color: '#bb0000',
    accent2Color: '#efefef',
    accent3Color: '#949494',
    textColor: '#222222',
    secondaryTextColor: fade('#222222', 0.54),
    alternateTextColor: '#efefef',
    canvasColor: '#efefef',
    borderColor: '#d1d1d1',
    disabledColor: fade('#222222', 0.3),
    pickerHeaderColor: '#bb0000',
    clockCircleColor: fade('#222222', 0.07),
    shadowColor: '#0a0a0a',
  }
});

const AppContainer = (props) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div style={container_style}>
      <TraVerseBar/>
      <Paper zDepth={1} style={paper_style}>
        {props.children}
      </Paper>
      <div style={footer_style}>
        <p style={cc_style}>Copyright 2017 The Ohio State University.</p>
      </div>
    </div>
  </MuiThemeProvider>
);

export default AppContainer;
