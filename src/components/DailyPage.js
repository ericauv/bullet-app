import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DailyActivity from './DailyActivity';
const DailyPageTag = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  border: 1px solid black;
`;

class DailyPage extends React.Component {
  static propTypes = {
    activities: PropTypes.shape(),
    dayId: PropTypes.string,
    updateDay: PropTypes.func
  };

  render() {
    const activities = { ...this.props.activities };
    const dayId = this.props.dayId;

    return (
      <DailyPageTag>
        {Object.values(activities).map(activity => {
          console.log(activity);

          return (
            <DailyActivity
              key={activity.id}
              activity={activity}
              dayId={dayId}
              updateDay={this.props.updateDay}
            />
          );
        })}
      </DailyPageTag>
    );
  }
}
export default DailyPage;
