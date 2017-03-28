import React from 'react';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar'; 
import { createNewUser } from './models/user.jsx';

export default class TraVerseStudent extends React.Component {
  static button_style = {
    'margin': '12px'
  }

  static check_style = {
    'marginTop': '1rem'
  }

  static menu_style = {
    'marginTop': '1rem',
    'padding': '0'
  }
  
  static progress_style = {
    'marginTop': '1rem'
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      instructor: '',
      level: 0,
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
      email: this.state.email,
      password: this.state.password,
      level: this.state.level,
      instructor: this.state.instructor
    }, {
      onSuccess: () => {
        this.setState({
          completed: 100,
          snackbarOpen: true,
          snackbarMessage: 'User successfully saved.'
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
          snackbarMessage: 'Could not create user.'
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

  handleLevelChange = (event, newValue) => {
    this.setState({
      level: newValue
    });
  }

  handleInstructorChange = (event, newValue) => {
    this.setState({
      instructor: newValue
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
          floatingLabelText="Username"
          onChange={this.handleUsernameChange}
        /><br/>
        <TextField
          floatingLabelText="Email"
          onChange={this.handleEmailChange}
        /><br/>
        <TextField
          floatingLabelText="Instructor"
          onChange={this.handleInstructorChange}
        /><br/>
        <SelectField
          value={this.state.level}
          onChange={this.handleLevelChange}
          maxHeight={200}
          style={TraVerseStudent.menu_style}
        >
          { [1,2,3,4,5,6,7,8,9,10].map((x, i) => {
            return (<MenuItem value={i} primaryText={`Level ${i}`} />);
          })}
        </SelectField><br/>
        <TextField
          floatingLabelText="Password"
          type="password"
          onChange={this.handlePasswordChange}
        /><br/>
        <Checkbox
          label="Notify student with their account credentials."
          style={TraVerseStudent.check_style}
        /><br/>
        <RaisedButton
          label={this.state.saveMessage}
          primary={true}
          disabled={!this.state.saveEnabled}
          style={TraVerseStudent.button_style}
          onTouchTap={this.handleSaveRequest}
        />
        <RaisedButton
          label="Cancel"
          disabled={!this.state.saveEnabled}
          style={TraVerseStudent.button_style}
          onTouchTap={this.handleCancelRequest}
        />
        {
          this.state.progressHidden
            ? null
            : <LinearProgress
              style={TraVerseStudent.progress_style}
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
