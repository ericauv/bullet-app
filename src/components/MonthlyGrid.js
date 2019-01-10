import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ActivityGrid from './ActivityGrid';

class MonthlyGrid extends React.Component {
  static propTypes = {
    activities: PropTypes.arrayOf(
      PropTypes.shape({
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
    dateForGrid: PropTypes.instanceOf(Date)
  };

  render() {
    const activities = this.props.activities;
    const MonthlyGridTag = styled.div`
      display: grid;
      grid-gap: 5px;
    `;

    return (
      <MonthlyGridTag>
        {activities.map(activity => {
          return (
            <ActivityGrid
              key={activity.name}
              activity={activity}
              dateForGrid={this.props.dateForGrid}
            />
          );
        })}
      </MonthlyGridTag>
    );
  }
}

export default MonthlyGrid;
