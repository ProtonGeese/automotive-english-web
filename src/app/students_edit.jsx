import React from 'react';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import { getUser, updateUser } from './models/user.jsx';

export default class TraVerseStudentEdit extends React.Component {
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

  static propTypes = {
    params: React.PropTypes.any
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
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

  componentDidMount = () => {
    getUser({
      username: this.props.params.userId
    }, {
      onSuccess: (data) => {
        var newState = {};
        
        newState.username = data.Username;
        newState.email = data.UserAttributes.find((a) => {
          return a.Name === 'email';
        }).Value;

        newState.level = data.UserAttributes.find((a) => {
          return a.Name === 'custom:level';
        });
        newState.level = newState.level ? parseInt(newState.level.Value) : 0;

        newState.instructor = data.UserAttributes.find((a) => {
          return a.Name === 'custom:instructor';
        });
        newState.instructor = newState.instructor ? newState.instructor.Value : '';

        this.setState(newState);
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

  handleSaveRequest = () => {
    this.setState({
      saveEnabled: false,
      saveMessage: 'Saving...',
      progressHidden: false
    });

    updateUser({
      username: this.state.username,
      email: this.state.email,
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
          snackbarMessage: 'Could not save user.'
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
        <TextField
          floatingLabelText="Instructor"
          value={this.state.instructor}
          onChange={this.handleInstructorChange}
        /><br/>
        <SelectField
          value={this.state.level}
          onChange={this.handleLevelChange}
          maxHeight={200}
          style={TraVerseStudentEdit.menu_style}
        >
          { [1,2,3,4,5,6,7,8,9,10].map((x, i) => {
            return (<MenuItem key={i} value={i} primaryText={`Level ${i}`} />);
          })}
        </SelectField><br/>
        <RaisedButton
          label={this.state.saveMessage}
          primary={true}
          disabled={!this.state.saveEnabled}
          style={TraVerseStudentEdit.button_style}
          onTouchTap={this.handleSaveRequest}
        />
        <RaisedButton
          label="Cancel"
          disabled={!this.state.saveEnabled}
          style={TraVerseStudentEdit.button_style}
          onTouchTap={this.handleCancelRequest}
        />
        {
          this.state.progressHidden
            ? null
            : <LinearProgress
              style={TraVerseStudentEdit.progress_style}
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
