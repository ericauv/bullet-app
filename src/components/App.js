import React from 'react';
import PropTypes from 'prop-types';
import base from '../base';
import MonthlyGrid from './MonthlyGrid';
import MonthPicker from './MonthPicker';
import {
  dateDiff,
  sortedDaysArrayFromDaysKeys,
  isSameMonthAndYear
} from './Helper';
import ManageActivities from './ManageActivities';
import DailyPage from './DailyPage';
import PageNotFound from './PageNotFound';
const theme = {
  colours: {
    red: '252, 53, 53',
    blue: '53, 53, 252',
    yellow: '252, 252, 53',
    green: '53, 252, 53',
    orange: '252, 153, 53',
    purple: '153, 53, 252',
    pink: '247, 17, 132',
    brown: '87, 51, 14',
    black: '9, 5, 0'
  },
  bulletSizes: {
    dailyPage: 40,
    monthlyGrid: 22
  }
};
const categories = [
  'Creative',
  'Intellectual',
  'Material',
  'Nutritional',
  'Physical',
  'Social',
  'No Category'
];
class App extends React.Component {
  state = {
    activities: {},
    dateForGrid: new Date()
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
    ),
    renderComponent: PropTypes.string
  };

  componentDidMount() {
    this.ref = base.syncState('/activities/', {
      context: this,
      state: 'activities'
    });
  }
  componentDidUpdate() {
    this.generateDaysUntilToday();
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
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

  handleActivitySubmit = activity => {
    // Make a copy of state
    const activities = { ...this.state.activities };
    // Add activity to activities
    activities[activity.id] = activity;
    // Update state
    this.setState({ activities });
  };

  handleDeleteActivity = id => {
    // Make a copy of state
    const activities = { ...this.state.activities };
    // Delete the activity
    activities[id] = null;
    // Update state
    this.setState({ activities });
  };

  updateDay = (activityId, dayId, quantToFill, notes) => {
    // Make a copy of state
    const activities = this.state.activities;
    // Make a copy of the activity
    const activity = activities[activityId];
    // Update the quantFilled
    activity.days[dayId].quantFilled = quantToFill;
    // Update the notes
    activity.days[dayId].notes = notes;
    // Set the state
    this.setState({ activities });
  };
  changeDateForGrid = newDate => {
    const dateForGrid = new Date(newDate);
    this.setState({ dateForGrid: dateForGrid });
  };

  createRender = (renderComponent, params, categories, theme) => {
    console.log(params);

    if (renderComponent === 'monthly' || renderComponent === 'daily') {
      // Check that the passed date was valid
      //TODO: Validate Entered URL Date
      const invalidDate = false;
      if (invalidDate === true) {
        return <PageNotFound />;
      }
    }
    if (renderComponent === 'monthly') {
      const proposedDateForGrid = new Date(`${params.year}/${params.month}/01`);

      // Change dateForGrid to today's date if it is in today's month (and year)
      const dateForGrid = isSameMonthAndYear(proposedDateForGrid, new Date())
        ? new Date()
        : proposedDateForGrid;
      // this.changeDateForGrid(dateForGrid);

      return (
        <>
          <MonthPicker
            dateForGrid={dateForGrid}
            changeDateForGrid={this.changeDateForGrid}
          />
          <MonthlyGrid
            activities={this.state.activities}
            categories={categories}
            dateForGrid={dateForGrid}
            updateDay={this.updateDay}
            handleActivitySubmit={this.handleActivitySubmit}
            handleDeleteActivity={this.handleDeleteActivity}
            theme={theme}
            bulletSize={theme.bulletSizes.monthlyGrid}
          />
        </>
      );
    } else if (renderComponent === 'daily') {
      const dateForGrid = new Date(
        `${params.year}/${params.month}/${params.day}`
      );
      // this.changeDateForGrid(dateForGrid);

      return (
        <DailyPage
          activities={this.state.activities}
          dayId={dateForGrid.toDateString()}
          updateDay={this.updateDay}
          bulletSize={theme.bulletSizes.dailyPage}
        />
      );
    } else if (renderComponent === 'activities') {
      return (
        <ManageActivities
          activities={this.state.activities}
          categories={categories}
          colours={theme.colours}
          handleDeleteActivity={this.handleDeleteActivity}
          handleActivitySubmit={this.handleActivitySubmit}
        />
      );
    }
    return <PageNotFound />;
  };

  render() {
    // Get params from Router
    const params = this.props.match.params;

    const renderComponent = this.props.renderComponent;

    return this.createRender(renderComponent, params, categories, theme);
  }
}

export default App;
