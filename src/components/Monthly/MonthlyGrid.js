import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DateHeaderGrid from './DateHeaderGrid';
import ActivityGrid from './ActivityGrid';
import EditActivity from '../Dialogs/EditActivity';
import { compareMonthsTrinary } from '../Helper';

/* Styling */
const MonthlyGridTag = styled.div`
  border: 1px solid black;
  padding: 20px;
  display: grid;
  grid-gap: 5px;
  @media only screen and (max-width: 1100px) {
    grid-template-columns: repeat(auto-fit, minmax(24px, 30px));
  }
`;

const GridTag = styled.div`
  display: grid;
  grid-gap: 5px;
  @media only screen and (min-width: 1101px) {
    grid-template-columns: 240px repeat(auto-fit, minmax(20px, 1fr));
    max-width: 100%;
    align-items: center;
  }
  @media only screen and (max-width: 1100px) {
    grid-template-rows: 240px repeat(auto-fit, minmax(20px, 1fr));
    justify-items: center;
  }
`;
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
    updateDay: PropTypes.func,
    handleActivitySubmit: PropTypes.func,
    deleteActivityWithId: PropTypes.func,
    categories: PropTypes.arrayOf(PropTypes.string),
    bulletSize: PropTypes.number,
    theme: PropTypes.shape()
  };

  render() {
    return (
      <MonthlyGridTag>
        <DateHeaderGrid
          monthName={this.props.dateForGrid.toLocaleString('en-us', {
            month: 'long'
          })}
          month={this.props.dateForGrid.getMonth()}
          year={this.props.dateForGrid.getFullYear()}
          GridTag={GridTag}
          bulletSize={this.props.bulletSize || 22}
        />
        {Object.keys(this.props.activities).map(id => {
          const activity = this.props.activities[id];
          // Don't make an activity grid if the activity wasn't created yet
          if (
            compareMonthsTrinary(
              this.props.dateForGrid,
              activity.dateCreated
            ) === -1
          ) {
            return null;
          }
          return (
            <ActivityGrid
              key={activity.id}
              activity={activity}
              categories={this.props.categories}
              dateForGrid={this.props.dateForGrid}
              updateDay={this.props.updateDay}
              handleActivitySubmit={this.props.handleActivitySubmit}
              handleDeleteActivity={this.props.handleDeleteActivity}
              GridTag={GridTag}
              colours={this.props.theme.colours}
              bulletSize={this.props.bulletSize || 22}
            />
          );
        })}
        <EditActivity /* Add Activity Button */
          isAddActivity={true}
          handleActivitySubmit={this.props.handleActivitySubmit}
          categories={this.props.categories}
          colours={this.props.theme.colours}
        />
      </MonthlyGridTag>
    );
  }
}

export default MonthlyGrid;
