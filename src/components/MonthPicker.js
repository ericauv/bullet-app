import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { isSameMonthAndYear, dateAdd } from './Helper';
import { Link } from 'react-router-dom';

class MonthPicker extends React.Component {
  static propTypes = {
    dateForGrid: PropTypes.string,
    changeDateForGrid: PropTypes.func,
    earliestDateCreated: PropTypes.instanceOf(Date)
  };
  handleClick = e => {
    const name = e.currentTarget.name;
    const newDateForGrid = isSameMonthAndYear(name, new Date())
      ? new Date().toDateString()
      : name;
    this.props.changeDateForGrid(newDateForGrid);
  };

  populateMonths = () => {
    const months = [];
    for (
      let currentYear = new Date().getFullYear();
      currentYear >= new Date(this.props.earliestDateCreated).getFullYear();
      currentYear--
    ) {
      let currentMonth =
        currentYear === new Date().getFullYear() ? new Date().getMonth() : 11;
      for (currentMonth; currentMonth >= 0; currentMonth--) {
        months.push(new Date(`${currentYear}/${currentMonth + 1}/01`));
      }
    }
    return months;
  };

  render() {
    const months = [...this.populateMonths()];

    return (
      <>
        {months.map(month => {
          return (
            <div style={{ height: '20px' }}>
              <Link
                to={`/monthly/${month.getFullYear()}/${month.getMonth() + 1}`}
              >{`${month.toLocaleString('en-us', {
                month: 'long'
              })} ${month.getFullYear()}`}</Link>
            </div>
          );
        })}
        {/* <Button name="2018/11/01" onClick={this.handleClick}>
          November 2018
        </Button>
        <Button name="2018/12/01" onClick={this.handleClick}>
          December 2018
        </Button>
        <Button name="2019/01/01" onClick={this.handleClick}>
          January 2019
        </Button>
        <Button name="2019/02/01" onClick={this.handleClick}>
          February 2019
        </Button> */}
      </>
    );
  }
}

export default MonthPicker;
