import React from 'react';
import Mailto from 'react-mailto';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

const button_style = {
  "margin": "12px"
}

const check_style = {
  "marginTop": "1rem"
}

const HondaStudentEdit = () => (
  <div>
    <h2>Create a new user.</h2>
    <TextField
      floatingLabelText="Name"
    /><br/>
    <TextField
      floatingLabelText="Email"
    /><br/>
    <TextField
      floatingLabelText="Password"
      type="password"
    /><br/>
    <TextField
      floatingLabelText="Confirm Password"
      type="password"
    /><br/>
    <TextField
      floatingLabelText="Section"
    /><br/>
    <Checkbox
      label="Notify student with their account credentials."
      style={check_style}
    /><br/>
    <RaisedButton label="Save" primary={true} style={button_style} />
    <RaisedButton label="Cancel" style={button_style} />
  </div>
);

export default HondaStudentEdit;
