import React from 'react';
import { hashHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import { logout, isLoggedIn } from './models/auth.jsx';

export default class HondaBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  handleSignOut = () => {
    logout();
    hashHistory.push('/login');
  }

  render() {
    return (
      <div>
        <AppBar
          title="Honda Automotive"
          zDepth={1}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            isLoggedIn()
              ? <FlatButton
                  label="Sign out"
                  onTouchTap={this.handleSignOut}
                />
              : null
          }
        />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem
            primaryText="Home"
            containerElement={<Link to="/" />}
          />
          <MenuItem
            primaryText="Students"
            containerElement={<Link to="/students" />}
          />
          <MenuItem
            primaryText="Instructors"
            containerElement={<Link to="/instructors" />}
          />
          <MenuItem
            primaryText="Conversations"
            containerElement={<Link to="/conversations" />}
          />
          <MenuItem
            primaryText="Lessons"
            containerElement={<Link to="/lessons" />}
          />
        </Drawer>
      </div>
    );
  }
}
