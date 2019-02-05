import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Bullet from './Bullet';
import DailyActivityDetails from './DailyActivityDetails';

const DailyActivityTag = styled.div`
  display: grid;
  grid-template-rows: minmax(30px, 1fr) minmax(40px, 1fr) minmax(50px, 2fr);
  justify-items: center;
  box-shadow: 2px 2px black;
  margin-bottom: 20px;
  border: 1px dashed black;
  &:hover {
    transform: scale(1.05);
    transition: 0.3s;
    cursor: pointer;
  }
  border-radius: 5px 5px 5px 5px;
`;

const DailyActivityNameTag = styled.h2`
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
`;

class DailyActivity extends React.Component {
  static propTypes = {
    activities: PropTypes.shape(),
    dayId: PropTypes.string,
    updateDay: PropTypes.func,
    bulletSize: PropTypes.number
  };

  render() {
    const activity = { ...this.props.activity };
    const dayId = this.props.dayId;

    return (
      <DailyActivityTag>
        <DailyActivityNameTag>{activity.name}</DailyActivityNameTag>
        <Bullet
          key={`${activity.id}_${dayId}`}
          activityId={activity.id}
          activityName={activity.name}
          name={activity.name}
          date={dayId}
          quantFilled={activity.days[dayId].quantFilled}
          quantTarget={activity.quantTarget}
          unit={activity.unit}
          notes={activity.days[dayId].notes}
          isBeforeCreationDate={false}
          isAfterToday={false}
          updateDay={this.props.updateDay}
          backgroundColor={`rgba(${activity.colour},${parseFloat(
            activity.days[dayId].quantFilled
          ) / parseFloat(activity.quantTarget)})`}
          bulletSize={this.props.bulletSize || 30}
        />
        <DailyActivityDetails
          activity={activity}
          key={`${activity.id}_${dayId}`}
          dayId={dayId}
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
