import React from 'react';
import { hashHistory } from 'react-router';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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

  static menu_style = {
    'marginTop': '1rem',
    'padding': '0'
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
      description: this.state.description,
      level: this.state.level
    }, {
      onSuccess: () => {
        this.setState({
          completed: 100,
          snackbarOpen: true,
          snackbarMessage: 'Lesson successfully created.'
        });

        this.setTimeout(() => {
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

        this.setTimeout(() => {
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

  handleLevelChange = (event, newValue) => {
    this.setState({
      level: newValue
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
        <SelectField
          value={this.state.level}
          onChange={this.handleLevelChange}
          maxHeight={200}
          style={TraVerseLessonsNew.menu_style}
        >
          { [1,2,3,4,5,6,7,8,9,10].map((x, i) => {
            return (<MenuItem key={i} value={i} primaryText={`Level ${i}`} />);
          })}
        </SelectField><br/>
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

reactMixin(TraVerseLessonsNew.prototype, TimerMixin);
