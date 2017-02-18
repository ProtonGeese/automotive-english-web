import React from 'react';
import Mailto from 'react-mailto';
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
      snackbarMessage: "Error, this message should not be seen."
    }
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
    this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
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
            />
            <FlatButton
              label="Delete User"
              icon={<ActionDeleteForever/>}
              secondary={true}
              disabled={!this.state.hasSelection}
              onClick={this.handleDeleteRequest}
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
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn><Link to="/student/1">John Smith</Link></TableRowColumn>
              <TableRowColumn>Student</TableRowColumn>
              <TableRowColumn><Mailto email="smith.1@osu.edu">smith.1@osu.edu</Mailto></TableRowColumn>
              <TableRowColumn>85%</TableRowColumn>
              <TableRowColumn><FlatButton label="Details"/></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn><Link to="/student/2">Randal White</Link></TableRowColumn>
              <TableRowColumn>Student</TableRowColumn>
              <TableRowColumn><Mailto email="white.1@osu.edu">white.1@osu.edu</Mailto></TableRowColumn>
              <TableRowColumn>92%</TableRowColumn>
              <TableRowColumn><FlatButton label="Details"/></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn><Link to="/student/3">Maria Sanders</Link></TableRowColumn>
              <TableRowColumn>Student</TableRowColumn>
              <TableRowColumn><Mailto email="sanders.1@osu.edu">sanders.1@osu.edu</Mailto></TableRowColumn>
              <TableRowColumn>79%</TableRowColumn>
              <TableRowColumn><FlatButton label="Details"/></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn><Link to="/student/4">Steve Brown</Link></TableRowColumn>
              <TableRowColumn>Student</TableRowColumn>
              <TableRowColumn><Mailto email="brown.1@osu.edu">brown.1@osu.edu</Mailto></TableRowColumn>
              <TableRowColumn>56%</TableRowColumn>
              <TableRowColumn><FlatButton label="Details"/></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>5</TableRowColumn>
              <TableRowColumn><Link to="/student/5">Joey Chagnon</Link></TableRowColumn>
              <TableRowColumn>Student</TableRowColumn>
              <TableRowColumn><Mailto email="chagnon.5@osu.edu">chagnon.5@osu.edu</Mailto></TableRowColumn>
              <TableRowColumn>100%</TableRowColumn>
              <TableRowColumn><FlatButton label="Details"/></TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default HondaStudents;
