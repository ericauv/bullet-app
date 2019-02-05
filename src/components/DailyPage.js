import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DailyActivity from './DailyActivity';
const DailyPageTag = styled.div`
  border: 1px solid black;
`;

const DailyPageGridTag = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-content: space-around;
  grid-gap: 20px;
`;
const DailyPageDateHeader = styled.h1`
  padding-top:5%
  padding-bottom:5%
  border-bottom: 2px solid black;
  width: 100%;
  text-align: center;
`;
class DailyPage extends React.Component {
  static propTypes = {
    activities: PropTypes.shape(),
    dayId: PropTypes.string,
    updateDay: PropTypes.func,
    bulletSize: PropTypes.number
  };

  render() {
    const activities = { ...this.props.activities };
    const dayId = this.props.dayId;

    return (
      <DailyPageTag>
        <DailyPageDateHeader>{dayId}</DailyPageDateHeader>
        <DailyPageGridTag>
          {Object.values(activities).map(activity => {
            return (
              <DailyActivity
                key={activity.id}
                activity={activity}
                dayId={dayId}
                updateDay={this.props.updateDay}
                bulletSize={this.props.bulletSize || 30}
              />
            );
          })}
        </DailyPageGridTag>
      </DailyPageTag>
    );
  }
}
export default DailyPage;
