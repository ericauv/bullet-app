import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SimpleMenu from './SimpleMenu';

class Nav extends React.Component {
  static propTypes = { title: PropTypes.string };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <SimpleMenu />
            <h1>{this.props.title}</h1>
            <Button>Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Nav;
