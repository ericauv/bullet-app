import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DateHeaderGrid from './DateHeaderGrid';
import ActivityGrid from './ActivityGrid';

class MonthlyGrid extends React.Component {
  static propTypes = {
    activities: PropTypes.shape(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        desc: PropTypes.string,
        quantTarget: PropTypes.number,
        unit: PropTypes.string,
        category: PropTypes.string,
        dateCreated: PropTypes.string,
        colour: PropTypes.string,
        days: PropTypes.object
      })
    ),
    dateForGrid: PropTypes.instanceOf(Date),
    updateDay: PropTypes.func
  };

  styleMonthlyGrid() {
    const monthlyGridTag = styled.div`
      display: grid;
      grid-gap: 5px;
    `;
    return monthlyGridTag;
  }

  render() {
    // Styling
    const MonthlyGridTag = this.styleMonthlyGrid();
    return (
      <MonthlyGridTag>
        <DateHeaderGrid
          monthName={this.props.dateForGrid.toLocaleString('en-us', {
            month: 'long'
          })}
          month={this.props.dateForGrid.getMonth()}
          year={this.props.dateForGrid.getFullYear()}
        />
        {Object.keys(this.props.activities).map(id => {
          const activity = this.props.activities[id];
          return (
            <ActivityGrid
              key={activity.name}
              activity={activity}
              dateForGrid={this.props.dateForGrid}
              updateDay={this.props.updateDay}
            />
          );
        })}
      </MonthlyGridTag>
    );
  }
}

export default MonthlyGrid;
