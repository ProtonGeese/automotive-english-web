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

import { listLessons, deleteLesson } from './models/lesson.jsx';

class HondaLessons extends React.Component {

  populateTableData = () => {
    listLessons({
      onSuccess: (data) => {
        this.setState({
          tableData: data.Items
        });
      },
      onFailure: () => {
        this.setState({
          snackbarOpen: true,
          snackbarMessage: 'Error, could not fetch lesson information'
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
    deleteLesson({
      lessonId: this.state.tableData[this.state.selectedRows].lessonId
    }, {
      onSuccess: () => {
        this.setState({
          confirmDelete: false,
          snackbarOpen: true,
          snackbarMessage: 'Lesson successfully deleted.'
        });
      },
      onFailure: () => {
        this.setState({
          confirmDelete: false,
          snackbarOpen: true,
          snackbarMessage: 'Could not delete lesson.'
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
    hashHistory.push('/lessons/' + this.state.tableData[this.state.selectedRows].lessonId + '/edit');
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
              label="New Lesson" primary={true}
              icon={<ContentAdd/>}
              containerElement={<Link to="/lessons/new" />}
            />
            <FlatButton
              label="Edit Lesson"
              icon={<ImageEdit/>}
              disabled={!this.state.hasSelection}
              onTouchTap={this.handleEditRequest}
            />
            <FlatButton
              label="Delete Lesson"
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
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
          >
            {this.state.tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.lessonId}</TableRowColumn>
                <TableRowColumn>{row.title}</TableRowColumn>
                <TableRowColumn>{row.description}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default HondaLessons;
