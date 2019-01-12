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

  render() {
    const activities = new Activities();
    activities.generateDaysUntilToday();
    // Get Activities Data
    const activitiesList = [...activities.state.activitiesList];
    return <MonthlyGrid activities={activitiesList} dateForGrid={new Date()} />;
  }
}

export default App;
