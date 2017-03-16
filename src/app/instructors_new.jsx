import React from 'react';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar'; 
import { createNewInstructor } from './models/instructor.jsx';

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

    createNewInstructor({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }, {
      onSuccess: () => {
        this.setState({
          completed: 100,
          snackbarOpen: true,
          snackbarMessage: 'Instructor successfully saved.'
        });
        
        setTimeout(() => {
          this.setState({
            saveEnabled: true,
            saveMessage: 'Save',
            progressHidden: true,
            completed: 0
          });
        }, 4000);
      },
      onFailure: () => {
        this.setState({
          completed: 0,
          snackbarOpen: true,
          snackbarMessage: 'Could not create instructor.'
        });

        setTimeout(() => {
          this.setState({
            saveEnabled: true,
            saveMessage: 'Save',
            progressHidden: true,
            completed: 0
          });
        });
      }
    });
  }

  handleCancelRequest = () => {
    hashHistory.goBack();
  }
  
  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false
    });
  }

  handleUsernameChange = (event, newValue) => {
    this.setState({
      username: newValue
    });
  }

  handleEmailChange = (event, newValue) => {
    this.setState({
      email: newValue
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
        <h2>Create a new instructor.</h2>
        <TextField
          floatingLabelText="Username"
          onChange={this.handleUsernameChange}
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
          style={HondaStudent.check_style}
        /><br/>
        <RaisedButton
          label={this.state.saveMessage}
          primary={true}
          disabled={!this.state.saveEnabled}
          style={HondaStudent.button_style}
          onTouchTap={this.handleSaveRequest}
        />
        <RaisedButton
          label="Cancel"
          disabled={!this.state.saveEnabled}
          style={HondaStudent.button_style}
          onTouchTap={this.handleCancelRequest}
        />
        {
          this.state.progressHidden
            ? null
            : <LinearProgress
              style={HondaStudent.progress_style}
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
