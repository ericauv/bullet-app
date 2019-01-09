import React from 'react';
import PropTypes from 'prop-types';
import Bullet from './Bullet';

class GridMonthly extends React.Component {
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
    // Map through activities
    return this.props.activities.map(activity => {
      // Map days for current activity
      return activity.days.map(day => {
        // Render Bullet for current day
        return (
          <Bullet
            name={activity.name}
            date={day.date}
            colour={activity.colour}
            quantPercentFilled={activity.quantTarget / day.quantFilled}
          />
        );
      });
    });
  }
}

export default GridMonthly;
