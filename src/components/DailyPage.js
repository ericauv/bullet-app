import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DailyActivity from './DailyActivity';
class DailyPage extends React.Component {
  static propTypes = {
    activities: PropTypes.shape(),
    dayId: PropTypes.string
  };

  render() {
    const activities = { ...this.props.activites };
    const dayId = this.props.dayId;
    return Object.values(activities).map(activity => {
      return (
        <DailyActivity key={activity.id} activity={activity} dayId={dayId} />
      );
    });
  }
}
export default DailyPage;
