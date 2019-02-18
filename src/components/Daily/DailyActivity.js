import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Bullet from '../Bullet';
import EditActivity from '../Dialogs/EditActivity';
import DailyActivityDetails from './DailyActivityDetails';
import ActivityName from '../ActivityName';
const DailyActivityTag = styled.div`
  display: grid;
  grid-template-rows: minmax(30px, 1fr) minmax(40px, 1fr) minmax(50px, 2fr);
  justify-items: center;
  box-shadow: 2px 2px black;
  margin-bottom: 20px;
  border: 1px solid black;
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
    bulletSize: PropTypes.number,
    isAddActivity: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.string),
    handleActivitySubmit: PropTypes.func,
    handleDeleteActivity: PropTypes.func,
    theme: PropTypes.shape()
  };

  render() {
    const activity = { ...this.props.activity };
    const dayId = this.props.dayId;

    return (
      <DailyActivityTag>
        {this.props.isAddActivity ? (
          <>
            <DailyActivityNameTag>Create Activity</DailyActivityNameTag>
            <EditActivity
              fab={true}
              isAddActivity={true}
              categories={this.props.categories}
              handleActivitySubmit={this.props.handleActivitySubmit}
              colours={this.props.theme.colours}
            />
            <DailyActivityDetails
              isAddActivity
              key={`${activity.id}_${dayId}_Details`}
              activity={activity}
              dayId={dayId}
            />
          </>
        ) : (
          <>
            <ActivityName
              activity={activity}
              colours={this.props.theme.colours}
              categories={this.props.categories}
              handleActivitySubmit={this.props.handleActivitySubmit}
              handleDeleteActivity={this.props.handleDeleteActivity}
            />
            <Bullet
              key={`${activity.id}_${dayId}_Daily`}
              activity={activity}
              dayId={dayId}
              updateDay={this.props.updateDay}
              bulletSize={this.props.bulletSize || 30}
            />
            <DailyActivityDetails
              isAddActivity={false}
              key={`${activity.id}_${dayId}_Details`}
              activity={activity}
              dayId={dayId}
            />
          </>
        )}
      </DailyActivityTag>
    );
  }
}
export default DailyActivity;
