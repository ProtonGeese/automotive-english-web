import React from 'react';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { login } from './auth.jsx';

export default class HondaLogin extends React.Component {
  static button_style = {
    margin: '12px',
    float: 'right'
  }

  static check_style = {
    marginTop: '1rem'
  }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      buttonText: 'Login',
      buttonEnabled: true,
      errorText: '',
      changePassword: false,
      changePasswordCallback: null
    };
  }

  handleUsernameChange = (event, newValue) => {
    this.setState({
      username: newValue,
      errorText: ''
    });
  }

  handlePasswordChange = (event, newValue) => {
    this.setState({
      password: newValue,
      errorText: ''
    });
  }

  handleLoginRequest = () => {
    this.setState({
      buttonText: 'Signing in…',
      buttonEnabled: false
    });

    login(this.state.username, this.state.password, {
      onSuccess: () => {
        hashHistory.push('/');
      },
      onFailure: () => {
        this.setState({
          buttonText: 'Login',
          buttonEnabled: true,
          errorText: 'Invalid username or password.'
        });
      },
      newPasswordRequired: (callback) => {
        this.setState({
          changePassword: true,
          changePasswordCallback: callback,
          buttonText: 'Update',
          buttonEnabled: true
        });
      }
    });
  }

  handleUpdatePasswordRequest = () => {
    this.setState({
      buttonEnabled: false
    });

    this.state.changePasswordCallback(this.state.password, {
      onSuccess: () => {
        hashHistory.push('/');
      },
      onFailure: (err) => {
        this.setState({
          errorText: 'Could not set new password',
          buttonEnabled: true
        });
      }
    });
  }

  render = () => {
    return (
      <div>
        {!this.state.changePassword ?
        <div>
          <h2>Login</h2>
          <TextField
            floatingLabelText="Email"
            onChange={this.handleUsernameChange}
            errorText={this.state.errorText}
          /><br/>
          <TextField
            floatingLabelText="Password"
            type="password"
            onChange={this.handlePasswordChange}
            errorText={this.state.errorText}
          /><br/>
          <RaisedButton
            label={this.state.buttonText}
            primary={true}
            disabled={!this.state.buttonEnabled}
            style={this.button_style}
            onTouchTap={this.handleLoginRequest}
          />
        </div>
        :
        <div>
          <h2>Update your password.</h2>
          <TextField
            floatingLabelText="Password"
            type="password"
            onChange={this.handlePasswordChange}
            errorText={this.state.errorText}
          /><br/>
          <RaisedButton
            label={this.state.buttonText}
            primary={true}
            disabled={!this.state.buttonEnabled}
            style={this.button_style}
            onTouchTap={this.handleUpdatePasswordRequest}
          />
        </div>
        }
      </div>
    );
  }
}
