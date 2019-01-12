import React from 'react';
import PropTypes from 'prop-types';
import Activities from './Activities';
import MonthlyGrid from './MonthlyGrid';

class App extends React.Component {
  state = {
    activities: []
  };

  static propTypes = {
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        desc: PropTypes.string,
        quantTarget: PropTypes.number,
        unit: PropTypes.string,
        category: PropTypes.string,
        dateCreated: PropTypes.string,
        colour: PropTypes.string,
        days: PropTypes.array
      })
    )
  };

  componentWillMount() {
    // Populate Activities Data before mounting
    const activitiesObj = new Activities();
    activitiesObj.generateDaysUntilToday();
    const activities = [...activitiesObj.state];
    this.setState({ activities });
  }

  updateDay = (activityIndex, day, quantToFill) => {
    // Make a copy of state
    const activities = this.state.activities;
    // Make a copy of the activity
    const activity = activities.find(
      activityItem => activityItem.index === activityIndex
    );
    const dayToFill = activity.days.find(dayItem => {
      return dayItem.date.toDateString() === day.toDateString();
    });
    // Don't try to update the day if it didn't exist
    if (!(activity && dayToFill)) {
      console.error(
        `Could not find day with activityIndex: ${activityIndex} and day: ${day.toDateString()}`
      );
      return;
    } else {
      // Fill or unfill the day
      dayToFill.quantFilled = quantToFill === 0 ? 0 : activity.quantTarget;
    }
    // Set the state
    this.setState({ activities });
  };

  render() {
    // const activities = new Activities();
    // activities.generateDaysUntilToday();
    // // Get Activities Data
    // const activitiesList = [...activities.state.activitiesList];
    return (
      <MonthlyGrid
        activities={this.state.activities}
        dateForGrid={new Date()}
        updateDay={this.updateDay}
      />
    );
  }
}

export default App;
