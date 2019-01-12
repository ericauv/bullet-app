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

  updateDay(activity, day) {}

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
