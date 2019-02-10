import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const today = new Date();

const LinkTagStyle = {
  display: 'inline-block',
  height: '100%',
  width: '100%',
  padding: '16px'
};
const MenuItemStyle = {
  paddingLeft: '0',
  paddingRight: '0'
};

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <MenuItem style={MenuItemStyle} onClick={this.handleClose}>
            <Link
              style={LinkTagStyle}
              to={`/daily/${today.getFullYear()}/${today.getMonth() +
                1}/${today.getDate()}`}
            >
              Daily
            </Link>
          </MenuItem>
          <MenuItem style={MenuItemStyle} onClick={this.handleClose}>
            <Link
              style={LinkTagStyle}
              to={`/monthly/${today.getFullYear()}/${today.getMonth() + 1}`}
            >
              Monthly
            </Link>
          </MenuItem>
          <MenuItem style={MenuItemStyle} onClick={this.handleClose}>
            <Link style={LinkTagStyle} to="/activities">
              Manage Activities
            </Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
