import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import HondaBar from './bar.jsx';

const paper_style = {
  "max-width": "80rem",
  "margin": "auto",
  "padding": "2rem",
  "margin-top": "1rem"
}

const container_style = {
  "display": "flex",
  "flex-direction": "column",
  "min-height": "100vh"
}

const footer_style = {
  "margin-top": "auto",
  "text-align": "center",
  "height": "4rem",
  "background": "#212121",
  "color": "#FAFAFA",
}

const cc_style = {
  "margin": "0rem",
  "padding": "0rem",
  "margin-top": "1.5rem"
}

const AppContainer = (props) => (
  <MuiThemeProvider>
    <div style={container_style}>
      <HondaBar/>
      <Paper zDepth={1} style={paper_style}>
        {props.children}
      </Paper>
      <div style={footer_style}>
        <p style={cc_style}>Copyright 2017 Honda</p>
      </div>
    </div>
  </MuiThemeProvider>
);

export default AppContainer;
