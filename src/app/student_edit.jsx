import React from 'react';
import Mailto from 'react-mailto';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

const button_style = {
  "margin": "12px"
}

const check_style = {
  "marginTop": "1rem"
}

const progress_style = {
  "marginTop": "1rem"
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default class HondaStudentEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      progressHidden: true,
      snackbarOpen: false,
      snackbarMessage: "Error, this message should not be seen.",
    }

    this.handleSaveRequest = this.handleSaveRequest.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  async handleSaveRequest() {
    this.setState({
      progressHidden: false
    });

    await sleep(1000);
    
    this.setState({
      completed: 50
    });

    await sleep(1000);
    
    this.setState({
      completed: 100,
      snackbarOpen: true,
      snackbarMessage: "User successfully saved."
    });

    setTimeout(() => {
      this.setState({
        progressHidden: true,
        completed: 0
      });
    }, 4000);
  }

  handleSnackbarClose() {
    this.setState({
      snackbarOpen: false
    });
  }

  render() {
    return (
      <div>
        <h2>Create a new user.</h2>
        <TextField
          floatingLabelText="Name"
        /><br/>
        <TextField
          floatingLabelText="Email"
        /><br/>
        <TextField
          floatingLabelText="Password"
          type="password"
        /><br/>
        <TextField
          floatingLabelText="Confirm Password"
          type="password"
        /><br/>
        <TextField
          floatingLabelText="Section"
        /><br/>
        <Checkbox
          label="Notify student with their account credentials."
          style={check_style}
        /><br/>
        <RaisedButton
          label="Save"
          primary={true}
          style={button_style}
          onTouchTap={this.handleSaveRequest}
        />
        <RaisedButton label="Cancel" style={button_style} />
        {
          this.state.progressHidden
            ? null
            : <LinearProgress
              style={progress_style}
              mode="determinate"
              value={this.state.completed}
            />
        }
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}
