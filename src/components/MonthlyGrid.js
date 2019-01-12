import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ActivityGrid from './ActivityGrid';

class MonthlyGrid extends React.Component {
  static propTypes = {
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.string,
        name: PropTypes.string,
        desc: PropTypes.string,
        quantTarget: PropTypes.number,
        unit: PropTypes.string,
        category: PropTypes.string,
        dateCreated: PropTypes.instanceOf(Date),
        colour: PropTypes.string,
        days: PropTypes.array
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
        {this.props.activities.map(activity => {
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
