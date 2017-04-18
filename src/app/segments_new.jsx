import React from 'react';
import { hashHistory } from 'react-router';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import { createNewSegment, uploadSegmentVideo } from './models/segment.jsx';

export default class TraVerseSegmentsNew extends React.Component {
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
      title: '',
      description: '',
      completed: 0,
      saveEnabled: true,
      saveMessage: 'Save',
      progressHidden: true,
      snackbarOpen: false,
      snackbarMessage: 'Error, this message should not be seen.',
      video: null,
      videoName: ''
    };
  }

  handleSaveRequest = () => {
    this.setState({
      saveEnabled: false,
      saveMessage: 'Saving...',
      progressHidden: false
    });

    uploadSegmentVideo(this.state.video, {
      onSuccess: (video) => {
        createNewSegment(this.props.params.lessonId, {
          title: this.state.title,
          description: this.state.description,
          link: video.Location
        }, {
          onSuccess: () => {
            this.setState({
              completed: 100,
              snackbarOpen: true,
              snackbarMessage: 'Segment successfully created.'
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
              snackbarMessage: 'Could not create segment.'
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
          snackbarMessage: 'Could not create segment.'
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
        <h2>Create a new segment.</h2>
        <TextField
          floatingLabelText="Title"
          onChange={this.handleTitleChange}
        /><br/>
        <TextField
          floatingLabelText="Description"
          onChange={this.handleDescriptionChange}
        /><br/>
        <RaisedButton
          label="Upload"
          labelPosition="before"
          containerElement="label"
          style={TraVerseSegmentsNew.upload_button_style}
        >
          <input
            type="file" 
            style={TraVerseSegmentsNew.input_style}
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
          style={TraVerseSegmentsNew.button_style}
          onTouchTap={this.handleSaveRequest}
        />
        <RaisedButton
          label="Cancel"
          disabled={!this.state.saveEnabled}
          style={TraVerseSegmentsNew.button_style}
          onTouchTap={this.handleCancelRequest}
        />
        {
          this.state.progressHidden
            ? null
            : <LinearProgress
              style={TraVerseSegmentsNew.progress_style}
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

reactMixin(TraVerseSegmentsNew.prototype, TimerMixin);
