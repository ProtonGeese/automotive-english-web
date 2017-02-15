import React from 'react';
import Mailto from 'react-mailto';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const HondaStudents = () => (
  <div>
    <Toolbar>
      <ToolbarGroup>
       <FlatButton label="New User" primary={true}/>
       <FlatButton label="Edit User"/>
       <FlatButton label="Delete User" secondary={true}/>
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
    <Table>
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
      <TableBody>
        <TableRow>
          <TableRowColumn>1</TableRowColumn>
          <TableRowColumn>John Smith</TableRowColumn>
          <TableRowColumn>Student</TableRowColumn>
          <TableRowColumn><Mailto email="smith.1@osu.edu">smith.1@osu.edu</Mailto></TableRowColumn>
          <TableRowColumn>85%</TableRowColumn>
          <TableRowColumn><FlatButton label="Details"/></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>2</TableRowColumn>
          <TableRowColumn>Randal White</TableRowColumn>
          <TableRowColumn>Student</TableRowColumn>
          <TableRowColumn><Mailto email="white.1@osu.edu">white.1@osu.edu</Mailto></TableRowColumn>
          <TableRowColumn>92%</TableRowColumn>
          <TableRowColumn><FlatButton label="Details"/></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>3</TableRowColumn>
          <TableRowColumn>Maria Sanders</TableRowColumn>
          <TableRowColumn>Student</TableRowColumn>
          <TableRowColumn><Mailto email="sanders.1@osu.edu">sanders.1@osu.edu</Mailto></TableRowColumn>
          <TableRowColumn>79%</TableRowColumn>
          <TableRowColumn><FlatButton label="Details"/></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>4</TableRowColumn>
          <TableRowColumn>Steve Brown</TableRowColumn>
          <TableRowColumn>Student</TableRowColumn>
          <TableRowColumn><Mailto email="brown.1@osu.edu">brown.1@osu.edu</Mailto></TableRowColumn>
          <TableRowColumn>56%</TableRowColumn>
          <TableRowColumn><FlatButton label="Details"/></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>5</TableRowColumn>
          <TableRowColumn>Joey Chagnon</TableRowColumn>
          <TableRowColumn>Student</TableRowColumn>
          <TableRowColumn><Mailto email="chagnon.5@osu.edu">chagnon.5@osu.edu</Mailto></TableRowColumn>
          <TableRowColumn>100%</TableRowColumn>
          <TableRowColumn><FlatButton label="Details"/></TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);

export default HondaStudents;
