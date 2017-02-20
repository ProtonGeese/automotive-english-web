import React from 'react';
import { hashHistory } from 'react-router';
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
import { login } from './auth.jsx';

const button_style = {
  "margin": "12px",
  "float": "right"
}

const check_style = {
  "marginTop": "1rem"
}

export default class HondaLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginRequest = this.handleLoginRequest.bind(this);
  }

  handleUsernameChange(event, newValue) {
    this.setState({
      username: newValue
    });
  }

  handlePasswordChange(event, newValue) {
    this.setState({
      password: newValue
    });
  }

  handleLoginRequest() {
    login(this.state.username, this.state.password, {
      onSuccess: (res) => {
        hashHistory.push('/');
      },
      onFailure: (err) => {
        alert(err);
      }
    });
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <TextField
          floatingLabelText="Email"
          onChange={this.handleUsernameChange}
        /><br/>
        <TextField
          floatingLabelText="Password"
          type="password"
          onChange={this.handlePasswordChange}
        /><br/>
        <RaisedButton
          label="Login"
          primary={true}
          style={button_style}
          onTouchTap={this.handleLoginRequest}
        />
      </div>
    );
  }
}
