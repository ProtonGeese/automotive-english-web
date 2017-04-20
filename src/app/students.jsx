import React from 'react';
import Mailto from 'react-mailto';
import { hashHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router';

import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';

import { listUsers, deleteUser, disableUser, enableUser } from './models/user.jsx';

class TraVerseStudents extends React.Component {

  static link_style = {
    'color': '#0e4e8e'
  };

  populateTableData = () => {
    listUsers(null, {
      onSuccess: (data) => {
        this.setState({
          tableData: data.Users.map((e) => {
            var newValue = {};

            newValue.email = e.Attributes.find((a) => {
              return a.Name === 'email';
            }).Value;

            newValue.level = e.Attributes.find((a) => {
              return a.Name === 'custom:level';
            });
            newValue.level = newValue.level ? newValue.level.Value : 'Unassigned';

            newValue.instructor = e.Attributes.find((a) => {
              return a.Name === 'custom:instructor';
            });
            newValue.instructor = newValue.instructor ? newValue.instructor.Value : 'None';

            newValue.username = e.Username;

            newValue.enabled = e.Enabled;

            return newValue;
          })
        });
      },
      onFailure: () => {
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
      tableData: [],
      enableToggleButtonText: 'Enable'
    };
  }

  handleRowSelection = (selectedRows) => {
    if (selectedRows.length === 0) {
      this.setState({
        hasSelection: false,
        selectedRows: []
      });
    } else {
      var item = this.state.tableData[selectedRows];
      this.setState({
        hasSelection: true,
        selectedRows: selectedRows,
        enableToggleButtonText: item.enabled ? 'Disable' : 'Enable'
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
        this.populateTableData();
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

  handleEnableDisableToggle = () => {
    var item = this.state.tableData[this.state.selectedRows];
    if (item.enabled) {
      disableUser({
        username: item.username
      }, {
        onSuccess: () => {
          item.enabled = false;
          this.setState({
            tableData: this.state.tableData,
            enableToggleButtonText: 'Enable'
          });
        },
        onFailure: () => {
          this.setState({
            snackbarOpen: true,
            snackbarMessage: 'Could not disable user.'
          });
        }
      });
    } else {
      enableUser({
        username: item.username
      }, {
        onSuccess: () => {
          item.enabled = true;
          this.setState({
            tableData: this.state.tableData,
            enableToggleButtonText: 'Disable'
          });
        },
        onFailure: () => {
          this.setState({
            snackbarOpen: true,
            snackbarMessage: 'Could not enable user.'
          });
        }
      });
    }
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
              label="New" primary={true}
              icon={<ContentAdd/>}
              containerElement={<Link to="/students/new" />}
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
              label={this.state.enableToggleButtonText}
              disabled={!this.state.hasSelection}
              icon={<ActionPowerSettingsNew/>}
              onTouchTap={this.handleEnableDisableToggle}
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
              <TableHeaderColumn>Username</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>State</TableHeaderColumn>
              <TableHeaderColumn>Instructor</TableHeaderColumn>
              <TableHeaderColumn>Level</TableHeaderColumn>
              <TableHeaderColumn>More</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
          >
            {this.state.tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn><Link style={TraVerseStudents.link_style} to={'/students/' + row.username + '/feedback'}>{row.username}</Link></TableRowColumn>
                <TableRowColumn><Mailto style={TraVerseStudents.link_style} email={row.email}>{row.email}</Mailto></TableRowColumn>
                <TableRowColumn>{row.enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                <TableRowColumn>{row.instructor}</TableRowColumn>
                <TableRowColumn>{row.level}</TableRowColumn>
                <TableRowColumn><FlatButton label="Details"/></TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default TraVerseStudents;
