import React from 'react';
import Mailto from 'react-mailto';
import Dialog from 'material-ui/Dialog';
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

const style = {
        margin: 12,
        };

export default class DialogExampleAlert extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
            <div>
            <h2>Create A New Post</h2>
            <TextField
                floatingLabelText="Subject"
          /><br/>
            <textarea rows="12" cols="100">
            </textarea>
            <br />
            <br />
            <RaisedButton label="Post" style = {style}/>
            <RaisedButton label="Cancel" secondary={true} style = {style} onTouchTap={this.handleOpen}/>
            <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Are you sure? Everything you've written will not be saved.
          </Dialog>
    </div>
    );
  }
}

//export default PostNew;

