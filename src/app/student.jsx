import React from 'react';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import { createNewUser } from './user_management.jsx';

export default class HondaStudent extends React.Component {
  static button_style = {
    'margin': '12px'
  }

  static check_style = {
    'marginTop': '1rem'
  }

  static progress_style = {
    'marginTop': '1rem'
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      completed: 0,
      saveEnabled: true,
      saveMessage: 'Save',
      progressHidden: true,
      snackbarOpen: false,
      snackbarMessage: 'Error, this message should not be seen.',
    };
  }

  handleSaveRequest = () => {
    this.setState({
      saveEnabled: false,
      saveMessage: 'Saving...',
      progressHidden: false
    });

    createNewUser({
      username: this.state.username,
      password: this.state.password
    }, (err, data) => {
      if(err) {
        this.setState({
          completed: 0,
          snackbarOpen: true,
          snackbarMessage: 'Could not create user.'
        });
        console.log(err);
      } else {
        this.setState({
          completed: 100,
          snackbarOpen: true,
          snackbarMessage: 'User successfully saved.'
        });
      }

      setTimeout(() => {
        this.setState({
          saveEnabled: true,
          saveMessage: 'Save',
          progressHidden: true,
          completed: 0
        });
      }, 4000);
    });
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false
    });
  }

  handleEmailChange = (event, newValue) => {
    this.setState({
      username: newValue
    });
  }

  handlePasswordChange = (event, newValue) => {
    this.setState({
      password: newValue
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
          onChange={this.handleEmailChange}
        /><br/>
        <TextField
          floatingLabelText="Password"
          type="password"
          onChange={this.handlePasswordChange}
        /><br/>
        <Checkbox
          label="Notify student with their account credentials."
          style={this.check_style}
        /><br/>
        <RaisedButton
          label={this.state.saveMessage}
          primary={true}
          disabled={!this.state.saveEnabled}
          style={this.button_style}
          onTouchTap={this.handleSaveRequest}
        />
        <RaisedButton
          label="Cancel"
          disabled={!this.state.saveEnabled}
          style={this.button_style}
        />
        {
          this.state.progressHidden
            ? null
            : <LinearProgress
              style={this.progress_style}
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
