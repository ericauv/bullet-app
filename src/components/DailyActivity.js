import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Bullet from './Bullet';
import DailyActivityDetails from './DailyActivityDetails';
const DailyActivityTag = styled.div`
  display: grid;
  grid-template-rows: 20px minmax(50px, 2fr) minmax(50px, 3fr);
`;

class DailyActivity extends React.Component {
  static propTypes = {
    activities: PropTypes.shape(),
    dayId: PropTypes.string
  };

  render() {
    const activity = { ...this.props.activity };
    const dayId = this.props.dayId;
    return (
      <DailyActivityTag>
        <h2>{activity.name}</h2>
        <Bullet
          key={`${activity.id}_${dayId}`}
          activityId={activity.id}
          activityName={activity.name}
          name={activity.name}
          date={dayId}
          quantFilled={activity.days[dayId].quantFilled}
          quantTarget={activity.quantTarget}
          unit={activity.unit}
          notes={activity.notes}
          isBeforeCreationDate={false}
          isAfterToday={false}
          updateDay={this.props.updateDay}
          backgroundColor={`rgba(${activity.colour},${parseFloat(
            activity.days[dayId].quantFilled
          ) / parseFloat(activity.quantTarget)})`}
        />
        <DailyActivityDetails
          key={`${activity.id}_${dayId}`}
          activityId={activity.id}
          quantFilled={activity.days[dayId].quantFilled}
          quantTarget={activity.quantTarget}
          quantUnit={activity.unit}
          notes={activity.notes}
        />
      </DailyActivityTag>
    );
  }
}
export default DailyActivity;
