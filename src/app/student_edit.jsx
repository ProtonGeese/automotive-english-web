import React from 'react';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

export default class HondaStudentEdit extends React.Component {
  static button_style = {
    'margin': '12px'
  }

  static check_style = {
    'marginTop': '1rem'
  }

  static progress_style = {
    'marginTop': '1rem'
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      saveEnabled: true,
      saveMessage: 'Save',
      progressHidden: true,
      snackbarOpen: false,
      snackbarMessage: 'Error, this message should not be seen.',
    };

    this.handleSaveRequest = this.handleSaveRequest.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  async handleSaveRequest() {
    this.setState({
      saveEnabled: false,
      saveMessage: 'Saving...',
      progressHidden: false
    });

    await this.sleep(1000);
 
    this.setState({
      completed: 50
    });

    await this.sleep(1000);
    
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
  }

  handleSnackbarClose() {
    this.setState({
      snackbarOpen: false
    });
  }

  render() {
    return (
      <div>
        <h2>Edit a user.</h2>
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
          style={HondaStudentEdit.check_style}
        /><br/>
        <RaisedButton
          label={this.state.saveMessage}
          primary={true}
          disabled={!this.state.saveEnabled}
          style={HondaStudentEdit.button_style}
          onTouchTap={this.handleSaveRequest}
        />
        <RaisedButton
          label="Cancel"
          disabled={!this.state.saveEnabled}
          style={HondaStudentEdit.button_style}
        />
        {
          this.state.progressHidden
            ? null
            : <LinearProgress
              style={HondaStudentEdit.progress_style}
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
