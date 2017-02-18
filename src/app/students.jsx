import React from 'react';
import Mailto from 'react-mailto';
import { hashHistory } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router'

import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ContentAdd from 'material-ui/svg-icons/content/add';

class HondaStudents extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      hasSelection: false,
      selectedRows: [],
      confirmDelete: false,
      snackbarOpen: false,
      snackbarMessage: "Error, this message should not be seen.",
      tableData: [
        {
          id: 1,
          name: "John Smith",
          role: "Student",
          email: "smith.1@osu.edu",
          grade: "85%"
        },
        {
          id: 2,
          name: "Randal White",
          role: "Student",
          email: "white.7@osu.edu",
          grade: "92%"
        },
        {
          id: 3,
          name: "Maria Sanders",
          role: "Student",
          email: "sanders.13@osu.edu",
          grade: "72%"
        },
        {
          id: 4,
          name: "Steve Brown",
          role: "Student",
          email: "brown.9@osu.edu",
          grade: "92%"
        },
        {
          id: 5,
          name: "Joey Chagnon",
          role: "Student",
          email: "chagnon.5@osu.edu",
          grade: "100%"
        }
      ]
    }

    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleEditRequest = this.handleEditRequest.bind(this);
    this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
    this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  handleRowSelection(selectedRows) {
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

  handleDeleteCancel() {
    this.setState({
      confirmDelete: false
    });
  }

  handleDeleteConfirm() {
    this.setState({
      confirmDelete: false,
      snackbarOpen: true,
      snackbarMessage: "User successfully deleted."
    });
  }

  handleDeleteRequest() {
    this.setState({
      confirmDelete: true
    });
  }

  handleEditRequest() {
    hashHistory.push("/student/" + this.state.tableData[this.state.selectedRows].id + "/edit");
  }

  handleSnackbarClose() {
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
          <p>Are you sure, this action cannot be undone.</p>
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
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Role</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Grade</TableHeaderColumn>
              <TableHeaderColumn>More</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
          >
            {this.state.tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.id}</TableRowColumn>
                <TableRowColumn><Link to={"/student/" + row.id}>{row.name}</Link></TableRowColumn>
                <TableRowColumn>{row.role}</TableRowColumn>
                <TableRowColumn><Mailto email={row.email}>{row.email}</Mailto></TableRowColumn>
                <TableRowColumn>{row.grade}</TableRowColumn>
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
