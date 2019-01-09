import React from 'react';
import PropTypes from 'prop-types';
import Activities from './Activities';
import GridMonthly from './GridMonthly';

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
    // Get Activities Data
    const activitiesList = [...activities.state.activitiesList];
    return <GridMonthly activities={activitiesList} />;
  }
}

export default App;
