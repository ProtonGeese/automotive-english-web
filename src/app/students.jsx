import React from 'react';
import Mailto from 'react-mailto';
import { hashHistory } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router';

import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { listUsers, deleteUser } from './models/user.jsx';

class HondaStudents extends React.Component { 

  populateTableData = () => {
    listUsers(null, {
      onSuccess: (data) => {
        this.setState({
          tableData: data.Users.map((e) => {
            var newValue = {};

            newValue.email = e.Attributes.find((a) => {
              return a.Name === 'email';
            }).Value;

            newValue.username = e.Username;

            return newValue;
          })
        });
      },
      onFailure: (err) => {
        this.setState({
          snackbarOpen: true,
          snackbarMessage: 'Error, could not fetch user information'
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
    deleteUser({
      username: this.state.tableData[this.state.selectedRows].username
    }, {
      onSuccess: () => {
        this.setState({
          confirmDelete: false,
          snackbarOpen: true,
          snackbarMessage: 'User successfully deleted.'
        });
      },
      onFailure: () => {
        this.setState({
          confirmDelete: false,
          snackbarOpen: true,
          snackbarMessage: 'Could not delete user.'
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
    hashHistory.push('/students/' + this.state.tableData[this.state.selectedRows].username + '/edit');
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false
    });
  }

  handleRefreshRequest = () => {
    this.populateTableData();
  }

  componentDidMount = () => {
    this.populateTableData();
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
              label="New User" primary={true}
              icon={<ContentAdd/>}
              containerElement={<Link to="/students/new" />}
            />
            <FlatButton
              label="Edit User"
              icon={<ImageEdit/>}
              disabled={!this.state.hasSelection}
              onTouchTap={this.handleEditRequest}
            />
            <FlatButton
              label="Delete User"
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
          <ToolbarGroup>
            <IconMenu
              iconButtonElement={
                <IconButton touch={true}>
                  <NavigationExpandMoreIcon/>
                </IconButton>
              }
            >
              <MenuItem primaryText="Export as…"/>
              <MenuItem primaryText="Help"/>
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <Table
          onRowSelection={this.handleRowSelection}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Username</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>More</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
          >
            {this.state.tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn><Link to={'/students/' + row.username}>{row.username}</Link></TableRowColumn>
                <TableRowColumn><Mailto email={row.email}>{row.email}</Mailto></TableRowColumn>
                <TableRowColumn><FlatButton label="Details"/></TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default HondaStudents;
