import React from 'react';
import { hashHistory, Link } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ContentAdd from 'material-ui/svg-icons/content/add';

class HondaLessons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSelection: false,
      selectedRows: [],
      confirmDelete: false,
      snackbarOpen: false,
      snackbarMessage: 'Error, this message should not be seen.',
      tableData: [
        {
          id: 1,
          title: 'Lesson 1',
          description: 'Introduction'
        },
        {
          id: 2,
          title: 'Lesson 2',
          description: 'Introduction'
        },
        {
          id: 3,
          title: 'Lesson 3',
          description: 'Introduction'
        },
        {
          id: 4,
          title: 'Lesson 4',
          description: 'Introduction'
        }
      ]
    };
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
    this.setState({
      confirmDelete: false,
      snackbarOpen: true,
      snackbarMessage: 'Lesson successfully deleted.'
    });
  }

  handleDeleteRequest = () => {
    this.setState({
      confirmDelete: true
    });
  }

  handleEditRequest = () => {
    hashHistory.push('/lessons/' + this.state.tableData[this.state.selectedRows].id + '/edit');
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
                <TableRowColumn>{row.id}</TableRowColumn>
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
