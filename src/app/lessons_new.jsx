import React from 'react';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import { createNewLesson } from './models/lesson.jsx';

export default class TraVerseLessonsNew extends React.Component {
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
      title: '',
      description: '',
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

    createNewLesson({
      title: this.state.title,
      description: this.state.description
    }, {
      onSuccess: () => {
        this.setState({
          completed: 100,
          snackbarOpen: true,
          snackbarMessage: 'Lesson successfully created.'
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
          snackbarMessage: 'Could not create lesson.'
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

  handleTitleChange = (event, newValue) => {
    this.setState({
      title: newValue
    });
  }

  handleDescriptionChange = (event, newValue) => {
    this.setState({
      description: newValue
    });
  }

  render() {
    return (
      <div>
        <h2>Create a new lesson.</h2>
        <TextField
          floatingLabelText="Title"
          onChange={this.handleTitleChange}
        /><br/>
        <TextField
          floatingLabelText="Description"
          onChange={this.handleDescriptionChange}
        /><br/>
        <RaisedButton
          label={this.state.saveMessage}
          primary={true}
          disabled={!this.state.saveEnabled}
          style={TraVerseLessonsNew.button_style}
          onTouchTap={this.handleSaveRequest}
        />
        <RaisedButton
          label="Cancel"
          disabled={!this.state.saveEnabled}
          style={TraVerseLessonsNew.button_style}
          onTouchTap={this.handleCancelRequest}
        />
        {
          this.state.progressHidden
            ? null
            : <LinearProgress
              style={TraVerseLessonsNew.progress_style}
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
