import React from 'react';
import PropTypes from 'prop-types';
import base from '../base';
import sampleActivities from '../sample-activities';
import MonthlyGrid from './MonthlyGrid';
import AddActivityForm from './AddActivityForm';
import { dateDiff, sortedDaysArrayFromDaysKeys } from './Helper';
class App extends React.Component {
  state = {
    activities: {}
  };

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
    )
  };

  componentDidMount() {
    this.ref = base.syncState('/', {
      context: this,
      state: 'activities'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  loadSampleDays = () => {
    // Populate state with sampleActivities
    this.setState({
      activities: this.generateDaysUntilToday(sampleActivities)
    });
  };

  generateDaysUntilToday = () => {
    const activitiesList = { ...this.state.activities };
    Object.keys(activitiesList).map(id => {
      const activity = activitiesList[id];
      // Sort activity.days to be in chronological order
      const sortedDays = sortedDaysArrayFromDaysKeys(
        Object.keys(activity.days)
      );
      // Get latest day object from activity.days
      const latestDayId = sortedDays[sortedDays.length - 1];
      const today = new Date();
      // Don't generate any days if latest day is today
      if (latestDayId === today.toDateString()) return activity;
      let nextDay = new Date(latestDayId);
      for (let i = 1; i <= dateDiff('d', new Date(latestDayId), today); i++) {
        nextDay.setDate(nextDay.getDate() + 1);
        // Add nextDay as new day object in activity.days
        activity.days[new Date(nextDay).toDateString()] = {
          notes: '',
          quantFilled: 0
        };
      }
      activitiesList[id] = activity;
      return activity;
    });
    if (this.state.activities !== activitiesList) {
      this.setState({ activities: activitiesList });
    }
    return { ...activitiesList };
  };
  addActivity = activity => {
    // Make a copy of state
    const activities = { ...this.state.activities };
    // Add activity to activities
    activities[activity.id] = activity;
    // Update state
    this.setState({ activities });
  };
  updateDay = (activityId, dayId, quantToFill) => {
    // Make a copy of state
    const activities = this.state.activities;
    // Make a copy of the activity
    const activity = activities[activityId];
    // Make a copy of the day
    const dayToFill = activity.days[dayId];
    // Fill or unfill the day
    dayToFill.quantFilled = quantToFill === 0 ? 0 : activity.quantTarget;
    // Set the state
    this.setState({ activities });
  };

  render() {
    return (
      <React.Fragment>
        <MonthlyGrid
          activities={this.state.activities}
          dateForGrid={new Date()}
          updateDay={this.updateDay}
        />
        <AddActivityForm addActivity={this.addActivity} />
        <button onClick={this.loadSampleDays}>Load Sample Activities</button>
      </React.Fragment>
    );
  }
}

export default App;
