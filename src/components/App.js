import React from 'react';
import PropTypes from 'prop-types';
import sampleActivities from '../sample-activities';
import MonthlyGrid from './MonthlyGrid';
import { dateDiff } from './Helper';

class App extends React.Component {
  constructor() {
    super();
    function generateDaysUntilToday(activitiesList = []) {
      const activities = activitiesList.map(activity => {
        // Sort activity.days to be in chronological order
        activity.days.sort((a, b) => (a.date > b.date ? 1 : -1));
        // Get latest day object from activity.days
        const latestDayObj = activity.days[activity.days.length - 1].date;
        const today = new Date();
        // Don't generate any days if latest day is today
        if (latestDayObj.toDateString() === today.toDateString())
          return activity;
        let nextDay = new Date(latestDayObj);
        // Create newDays array to store generated days
        const newDays = [];
        // Build newDays array
        for (let i = 1; i <= dateDiff('d', latestDayObj, today); i++) {
          nextDay.setDate(nextDay.getDate() + 1);
          const nextDayObj = {
            date: new Date(nextDay),
            notes: '',
            quantFilled: 0
          };
          newDays.push(nextDayObj);
        }
        // Append newDays to activity.days
        activity.days.push(...newDays);
        return activity;
      });
      console.log(activities);

      return activities;
    }
    // Populate state with sampleActivities
    this.state = { activities: generateDaysUntilToday(sampleActivities) };
  }

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
