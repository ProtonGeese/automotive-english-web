import React from 'react';
import { hashHistory } from 'react-router';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import { createNewFeedback, uploadFeedbackVideo } from './models/feedback.jsx';

export default class TraVerseStudentsFeedbackNew extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  }

  static button_style = {
    'margin': '12px'
  }

  static check_style = {
    'marginTop': '1rem',
  }

  static progress_style = {
    'marginTop': '1rem'
  }

  static menu_style = {
    'marginTop': '1rem',
    'padding': '0'
  }

  static input_style = {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  }

  static upload_button_style = {
    marginRight: '12px',
    position: 'relative',
    top: '-4px'
  }

  constructor(props) {
    super(props);
    this.state = {
      segmentId: '',
      segmentTitle: '',
      segmentDescription: '',
      video: null,
      videoName: '',
      completed: 0,
      saveEnabled: true,
      saveMessage: 'Save',
      progressHidden: true,
      snackbarOpen: false,
      snackbarMessage: 'Error, this message should not be seen.'
    };
  }

  handleSaveRequest = () => {
    this.setState({
      saveEnabled: false,
      saveMessage: 'Saving...',
      progressHidden: false
    });

    uploadFeedbackVideo(this.state.video, {
      onSuccess: (video) => {
        createNewFeedback(this.props.params.userId, this.state.segmentId, {
          segmentTitle: this.state.segmentTitle,
          segmentDescription: this.state.segmentDescription,
          segmentVideo: this.state.segmentVideo,
          studentVideo: video.Location
        }, {
          onSuccess: () => {
            this.setState({
              completed: 100,
              snackbarOpen: true,
              snackbarMessage: 'Submission successfully created.'
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
              snackbarMessage: 'Could not create submission.'
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
      },
      onFailure: () => {
        this.setState({
          completed: 0,
          snackbarOpen: true,
          snackbarMessage: 'Could not create submission.'
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

  handleIdChange = (event, newValue) => {
    this.setState({
      segmentId: newValue
    });
  }

  handleTitleChange = (event, newValue) => {
    this.setState({
      segmentTitle: newValue
    });
  }

  handleDescriptionChange = (event, newValue) => {
    this.setState({
      segmentDescription: newValue
    });
  }

  handleLinkChange = (event, newValue) => {
    this.setState({
      segmentVideo: newValue
    });
  }

  handleLevelChange = (event, newValue) => {
    this.setState({
      level: newValue
    });
  }

  handleUploadFileChoose = (event) => {
    this.setState({
      video: event.target.files[0],
      videoName: event.target.files[0].name
    });
  }

  handleUploadPathChange = () => {
    return;
  }

  render() {
    return (
      <div>
        <h2>Manual entry.</h2>
        <TextField
          floatingLabelText="Segment ID"
          onChange={this.handleIdChange}
        /><br/>
        <TextField
          floatingLabelText="Title"
          onChange={this.handleTitleChange}
        /><br/>
        <TextField
          floatingLabelText="Description"
          onChange={this.handleDescriptionChange}
        /><br/>
        <TextField
          floatingLabelText="Video Link"
          onChange={this.handleLinkChange}
        /><br/>
        <RaisedButton
          label="Upload"
          labelPosition="before"
          containerElement="label"
          style={TraVerseStudentsFeedbackNew.upload_button_style}
        >
          <input
            type="file"
            style={TraVerseStudentsFeedbackNew.input_style}
            onChange={this.handleUploadFileChoose}
          />
        </RaisedButton>
        <TextField
          floatingLabelText="File name"
          value={this.state.videoName}
          onChange={this.handleUploadPathChange}
        />
        <br/>
        <RaisedButton
          label={this.state.saveMessage}
          primary={true}
          disabled={!this.state.saveEnabled}
          style={TraVerseStudentsFeedbackNew.button_style}
          onTouchTap={this.handleSaveRequest}
        />
        <RaisedButton
          label="Cancel"
          disabled={!this.state.saveEnabled}
          style={TraVerseStudentsFeedbackNew.button_style}
          onTouchTap={this.handleCancelRequest}
        />
        {
          this.state.progressHidden
            ? null
            : <LinearProgress
              style={TraVerseStudentsFeedbackNew.progress_style}
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

reactMixin(TraVerseStudentsFeedbackNew.prototype, TimerMixin);
