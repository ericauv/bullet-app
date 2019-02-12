import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { isSameMonthAndYear, dateAdd } from '../Helper';
import { Link } from 'react-router-dom';

const MonthPickerTag = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

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
      <MonthPickerTag>
        {months.map(month => {
          return (
            <div key={month} style={{ height: '20px' }}>
              <Link
                to={`/monthly/${month.getFullYear()}/${month.getMonth() + 1}`}
              >{`${month.toLocaleString('en-us', {
                month: 'long'
              })} ${month.getFullYear()}`}</Link>
            </div>
          );
        })}
      </MonthPickerTag>
    );
  }
}

export default MonthPicker;
