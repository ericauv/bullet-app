import React from 'react';
import PropTypes from 'prop-types';

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
  render() {}
}

export default App;
