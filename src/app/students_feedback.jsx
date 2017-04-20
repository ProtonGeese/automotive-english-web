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

import { listFeedbacks, deleteFeedback } from './models/feedback.jsx';

class TraVerseFeedback extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  }

  populateTableData = () => {
    listFeedbacks(this.props.params.userId, {
      onSuccess: (data) => {
        this.setState({
          tableData: data.Items
        });
      },
      onFailure: () => {
        this.setState({
          snackbarOpen: true,
          snackbarMessage: 'Error, could not fetch student submissions.'
        });
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
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
    var selection= this.state.tableData[this.state.selectedRows];

    deleteFeedback(this.props.params.userId, selection.segmentId, {
      onSuccess: () => {
        this.setState({
          confirmDelete: false,
          snackbarOpen: true,
          snackbarMessage: 'Submission successfully deleted.'
        });
        this.populateTableData();
      },
      onFailure: () => {
        this.setState({
          confirmDelete: false,
          snackbarOpen: true,
          snackbarMessage: 'Could not delete submission.'
        });
      }
    });
  }

  handleDeleteRequest = () => {
    this.setState({
      confirmDelete: true
    });
  }

  handleRespondRequest = () => {
    hashHistory.push('/students/' + this.props.params.userId + '/feedback/' + this.state.tableData[this.state.selectedRows].segmentId);
  }

  handleRefreshRequest = () => {
    this.populateTableData();
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false
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
              containerElement={<Link to={'/students/' + this.props.params.userId + '/feedback/new'} />}
            />
            <FlatButton
              label="Respond"
              icon={<ImageEdit/>}
              disabled={!this.state.hasSelection}
              onTouchTap={this.handleRespondRequest}
            />
            <FlatButton
              label="Delete"
              icon={<ActionDeleteForever/>}
              secondary={true}
              disabled={!this.state.hasSelection}
              onTouchTap={this.handleDeleteRequest}
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
              <TableHeaderColumn>ID</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
          >
            {this.state.tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.segmentTitle}</TableRowColumn>
                <TableRowColumn>{row.segmentDescription}</TableRowColumn>
                <TableRowColumn>{row.segmentId}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default TraVerseFeedback;
