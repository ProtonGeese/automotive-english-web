import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router'

export default class HondaBar extends React.Component {
  constructor(props) {
    super(props);

    // The state of the drawer.
    this.state = {
      open: false
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <AppBar
          title="Honda Automotive"
          zDepth="1"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem
            primaryText="Students"
            containerElement={<Link to="/students" />}
          />
          <MenuItem
            primaryText="Conversations"
            containerElement={<Link to="/conversations" />}
          />
        </Drawer>
      </div>
    );
  }
}
