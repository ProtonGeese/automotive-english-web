import React from 'react';
import Mailto from 'react-mailto';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const HondaStudentNew = () => (
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
    <TextField
      floatingLabelText="Name"
    /><br/>
    <TextField
      floatingLabelText="Email"
    /><br/>
    <TextField
      floatingLabelText="Password"
      type="password"
    />
    </div>
);

export default HondaStudentNew;
