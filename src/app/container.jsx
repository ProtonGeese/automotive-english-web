import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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

const AppContainer = (props) => (
  <MuiThemeProvider>
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
