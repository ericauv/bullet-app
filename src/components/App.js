import React from 'react';
import PropTypes from 'prop-types';
import base from '../base';
import sampleActivities from '../sample-activities';
import MonthlyGrid from './MonthlyGrid';
import { dateDiff } from './Helper';
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

  generateDaysUntilToday(activitiesList = {}) {
    Object.keys(activitiesList).map(id => {
      const activity = activitiesList[id];
      // Sort activity.days to be in chronological order
      const sortedDays = Object.keys(activity.days).sort((a, b) =>
        new Date(a) > new Date(b) ? 1 : -1
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
    return { ...activitiesList };
  }
  addActivity = name => {
    const activities = { ...this.state.activities };
    const id = Date.now();
    activities[id] = {
      id: id,
      name: name,
      desc: '',
      quantTarget: 0,
      unit: '',
      category: '',
      dateCreated: new Date(id).toDateString(),
      colour: '0,0,0',
      days: {
        [new Date().toDateString()]: {
          date: new Date().toDateString(),
          quantfilled: 0,
          notes: ''
        }
      }
    };
    this.setState(...activities);
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
        <button onClick={this.loadSampleDays}>Load Sample Activities</button>
        <form>
          <input type="text" default="Activity Name" />
          <input type="number" />
          <button onClick={this.addActivity}>Add Activity</button>
        </form>
      </React.Fragment>
    );
  }
}

export default App;
