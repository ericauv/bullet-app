import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { isSameMonthAndYear } from './Helper';

class MonthPicker extends React.Component {
  static propTypes = {
    dateForGrid: PropTypes.string,
    changeDateForGrid: PropTypes.func
  };
  handleClick = e => {
    const name = e.currentTarget.name;
    const newDateForGrid = isSameMonthAndYear(name, new Date())
      ? new Date().toDateString()
      : name;
    this.props.changeDateForGrid(newDateForGrid);
  };
  render() {
    return (
      <>
        <Button name="2018/11/01" onClick={this.handleClick}>
          November 2018
        </Button>
        <Button name="2018/12/01" onClick={this.handleClick}>
          December 2018
        </Button>
        <Button name="2019/01/01" onClick={this.handleClick}>
          January 2019
        </Button>
      </>
    );
  }
}

export default MonthPicker;
