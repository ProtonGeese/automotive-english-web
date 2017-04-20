import React from 'react';
import { hashHistory } from 'react-router';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import ReactPlayer from 'react-player';

import { createNewFeedback, uploadFeedbackVideo, getFeedback, getSignedFeedbackVideoUrl, updateFeedback } from './models/feedback.jsx';
import { getSignedVideoUrl } from './models/segment.jsx';

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
      segmentVideo: '',
      segmentVideoLink: '',
      studentVideo: '',
      studentVideoLink: '',
      instructorVideo: '',
      instructorVideoLink: '',
      privateNotes: '',
      publicNotes: '',
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

  componentDidMount = () => {
    getFeedback(this.props.params.userId, this.props.params.segmentId, {
      onSuccess: (data) => {
        this.setState({
          segmentId: data.Item.segmentId,
          segmentTitle: data.Item.segmentTitle,
          segmentDescription: data.Item.segmentDescription,
          segmentVideo: data.Item.segmentVideo,
          studentVideo: data.Item.studentVideo,
          publicNotes: data.Item.publicNotes || '',
          privateNotes: data.Item.privateNotes || ''
        });

        getSignedFeedbackVideoUrl(data.Item.studentVideo, {
          onSuccess: (link) => {
            this.setState({
              studentVideoLink: link
            });
          },
          onFailure: (err) => {

          }
        });

        getSignedFeedbackVideoUrl(data.Item.instructorVideo, {
          onSuccess: (link) => {
            this.setState({
              instructorVideoLink: link
            });
          },
          onFailure: (err) => {

          }
        });

        getSignedVideoUrl(data.Item.segmentVideo, {
          onSuccess: (link) => {
            this.setState({
              segmentVideoLink: link
            });
          },
          onFailure: (err) => {
            
          }
        });
      },
      onFailure: (err) => {

      }
    });
  }

  handleSaveRequest = () => {
    this.setState({
      saveEnabled: false,
      saveMessage: 'Saving...',
      progressHidden: false
    });

    uploadFeedbackVideo(this.state.video, {
      onSuccess: (video) => {
        updateFeedback(this.props.params.userId, this.state.segmentId, {
          segmentTitle: this.state.segmentTitle,
          segmentDescription: this.state.segmentDescription,
          segmentVideo: this.state.segmentVideo,
          studentVideo: this.state.studentVideo,
          instructorVideo: video.Location,
          publicNotes: this.state.publicNotes,
          privateNotes: this.state.privateNotes
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

  handlePublicNotesChange = (event, newValue) => {
    this.setState({
      publicNotes: newValue
    });
  }

  handlePrivateNotesChange = (event, newValue) => {
    this.setState({
      privateNotes: newValue
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
        <h2>Respond.</h2>

        <h3>Title</h3>
        <p>{this.state.segmentTitle}</p>
    
        <h3>Description</h3>
        <p>{this.state.segmentDescription}</p>

        <h3>Segment Video</h3>
        <ReactPlayer
          style={TraVerseStudentsFeedbackNew.player_style}
          url={this.state.segmentVideoLink}
          controls={true}
        />

        <h3>Student Video</h3>
        <ReactPlayer
          style={TraVerseStudentsFeedbackNew.player_style}
          url={this.state.studentVideoLink}
          controls={true}
        />

        <h3>Feedback Video</h3>
        <ReactPlayer
          style={TraVerseStudentsFeedbackNew.player_style}
          url={this.state.instructorVideoLink}
          controls={true}
        />

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
          floatingLabelText="Replace the feedback video."
          value={this.state.videoName}
          onChange={this.handleUploadPathChange}
        />
        <br/>
        <TextField
          floatingLabelText="Public notes"
          value={this.state.publicNotes}
          multiLine={true}
          rows={5}
          onChange={this.handlePublicNotesChange}
        /><br/>
        <TextField
          floatingLabelText="Private notes"
          value={this.state.privateNotes}
          multiLine={true}
          rows={5}
          onChange={this.handlePrivateNotesChange}
        /><br/>
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
