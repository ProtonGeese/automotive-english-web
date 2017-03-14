import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import { getUser } from './models/user.jsx';

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
  
  static propTypes = {
    params: React.PropTypes.any
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
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

  componentDidMount = () => {
    getUser({
      username: this.props.params.userId
    }, {
      onSuccess: (data) => {
        this.setState({
          username: data.Username,
          email: data.UserAttributes.find((a) => {
            return a.Name === 'email';
          }).Value
        });
      },
      onFailure: () => {
        this.setState({
          snackbarOpen: true,
          snackbarMessage: 'Could not fetch user information.',
          saveEnabled: false
        });
      }
    });
  }

  handleEmailChange = (event, newValue) => {
    this.setState({
      email: newValue
    });
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

  handleSnackbarClose = () => {
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
          value={this.state.username}
          disabled={true}
        /><br/>
        <TextField
          floatingLabelText="Email"
          value={this.state.email}
          onChange={this.handleEmailChange}
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
