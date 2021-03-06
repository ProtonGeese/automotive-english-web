import React from 'react';
import { hashHistory, Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AvPlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';

import ReactPlayer from 'react-player';

import { listSegments, deleteSegment, getSignedVideoUrl } from './models/segment.jsx';

class TraVerseSegments extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  }

  static player_style = {
    margin: '0 auto'
  };

  populateTableData = () => {
    listSegments(this.props.params.lessonId, {
      onSuccess: (data) => {
        this.setState({
          tableData: data
        });
      },
      onFailure: () => {
        this.setState({
          snackbarOpen: true,
          snackbarMessage: 'Error, could not fetch segment information'
        });
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      videoLink: '',
      viewVideo: false,
      isPlaying: false,
      hasSelection: false,
      selectedRows: [],
      confirmDelete: false,
      snackbarOpen: false,
      snackbarMessage: 'Error, this message should not be seen.',
      tableData: []
    };
  }

  componentDidMount = () => {
    this.populateTableData();
  }

  handleRowSelection = (selectedRows) => {
    if (selectedRows.length === 0) {
      this.setState({
        hasSelection: false,
        selectedRows: []
      });
    } else {
      this.setState({
        hasSelection: true,
        selectedRows: selectedRows
      });
    }
  }

  handleDeleteCancel = () => {
    this.setState({
      confirmDelete: false
    });
  }

  handleDeleteConfirm = () => {
    deleteSegment(this.props.params.lessonId, this.state.tableData[this.state.selectedRows].segmentId, {
      onSuccess: () => {
        this.setState({
          confirmDelete: false,
          snackbarOpen: true,
          snackbarMessage: 'Segment successfully deleted.'
        });
        this.populateTableData();
      },
      onFailure: () => {
        this.setState({
          confirmDelete: false,
          snackbarOpen: true,
          snackbarMessage: 'Could not delete segment.'
        });
      }
    });
  }

  handleDeleteRequest = () => {
    this.setState({
      confirmDelete: true
    });
  }

  handleEditRequest = () => {
    hashHistory.push('/lessons/' + this.props.params.lessonId + '/segments/' + this.state.tableData[this.state.selectedRows].segmentId + '/edit');
  }

  handleRefreshRequest = () => {
    this.populateTableData();
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false
    });
  }

  handleViewRequest = () => {
    getSignedVideoUrl(this.state.tableData[this.state.selectedRows].link, {
      onSuccess: (url) => {
        console.log(url);
        this.setState({
          videoLink: url,
          viewVideo: true,
          isPlaying: true
        });
      },
      onFailure: () => {
        this.setState({
          confirmDelete: false,
          snackbarOpen: true,
          snackbarMessage: 'Could not play video.'
        });
      }
    });
  }

  handleViewCloseRequest = () => {
    this.setState({
      viewVideo: false,
      isPlaying: false
    });
  }

  render() {
    const confirmDeleteActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDeleteCancel}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        onTouchTap={this.handleDeleteConfirm}
      />
    ];

    const viewVideoActions = [
      <FlatButton
        label="close"
        primary={true}
        onTouchTap={this.handleViewCloseRequest}
      />
    ];

    return (
      <div>
        <Dialog
          actions={confirmDeleteActions}
          modal={false}
          open={this.state.confirmDelete}
        >
          <p>Are you sure? This action cannot be undone.</p>
        </Dialog>
        <Dialog
          modal={false}
          open={this.state.viewVideo}
          actions={viewVideoActions}
        >
          <ReactPlayer
            style={TraVerseSegments.player_style}
            url={this.state.videoLink}
            playing={this.state.isPlaying}
            controls={true}
          />
        </Dialog>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
        <Toolbar>
          <ToolbarGroup>
            <FlatButton
              label="New" primary={true}
              icon={<ContentAdd/>}
              containerElement={<Link to={'/lessons/' + this.props.params.lessonId + '/segments/new'} />}
            />
            <FlatButton
              label="Edit"
              icon={<ImageEdit/>}
              disabled={!this.state.hasSelection}
              onTouchTap={this.handleEditRequest}
            />
            <FlatButton
              label="Delete"
              icon={<ActionDeleteForever/>}
              secondary={true}
              disabled={!this.state.hasSelection}
              onTouchTap={this.handleDeleteRequest}
            />
            <FlatButton
              label="View"
              icon={<AvPlayCircleOutline/>}
              secondary={true}
              disabled={!this.state.hasSelection}
              onTouchTap={this.handleViewRequest}
            />
            <FlatButton
              label="Refresh"
              icon={<NavigationRefresh/>}
              onTouchTap={this.handleRefreshRequest}
            />
          </ToolbarGroup>
        </Toolbar>
        <Table
          onRowSelection={this.handleRowSelection}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn>Link</TableHeaderColumn>
              <TableHeaderColumn>ID</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
          >
            {this.state.tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.title}</TableRowColumn>
                <TableRowColumn>{row.description}</TableRowColumn>
                <TableRowColumn>{row.link}</TableRowColumn>
                <TableRowColumn>{row.segmentId}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default TraVerseSegments;
