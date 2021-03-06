import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DailyActivity from './DailyActivity';
import { dateAdd } from '../Helper';
const DailyPageTag = styled.div`
  border: 1px solid black;
`;

const DailyPageGridTag = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-content: space-around;
  grid-gap: 20px;
`;
const DailyPageDateGridTag = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, 1fr) minmax(150px, 2fr) minmax(
      100px,
      1fr
    );
`;
const DailyPageDateHeader = styled.h1`
  padding-top: 5%;
  padding-bottom: 5%;
  border-bottom: 2px solid black;
  width: 100%;
  text-align: center;
  user-select: none;
  cursor: pointer;
`;
class DailyPage extends React.Component {
  state = { dayId: null };
  static propTypes = {
    activities: PropTypes.shape(),
    dayId: PropTypes.string,
    updateDay: PropTypes.func,
    bulletSize: PropTypes.number,
    categories: PropTypes.arrayOf(PropTypes.string),
    handleActivitySubmit: PropTypes.func,
    handleDeleteActivity: PropTypes.func,
    theme: PropTypes.shape()
  };

  componentWillMount() {
    this.setState({
      dayId: this.props.dayId
    });
  }

  changeDay = newDay => () => {
    this.setState({ dayId: new Date(newDay) });
  };

  render() {
    const activities = { ...this.props.activities };
    const dayId = this.state.dayId.toDateString(); // TODO CHANGE THIS BACK MOST LIKELY
    const prevDayId = dateAdd('d', dayId, -1).toDateString();
    const nextDayId = dateAdd('d', dayId, 1).toDateString();

    return (
      <DailyPageTag>
        <DailyPageDateGridTag>
          <DailyPageDateHeader onClick={this.changeDay(prevDayId)}>
            {prevDayId}
          </DailyPageDateHeader>
          <DailyPageDateHeader>{dayId}</DailyPageDateHeader>
          <DailyPageDateHeader onClick={this.changeDay(nextDayId)}>
            {nextDayId}
          </DailyPageDateHeader>
        </DailyPageDateGridTag>
        <DailyPageGridTag>
          {Object.values(activities).map(activity => {
            return (
              <DailyActivity
                key={activity.id}
                activity={activity}
                dayId={dayId}
                updateDay={this.props.updateDay}
                bulletSize={this.props.bulletSize || 30}
                theme={this.props.theme}
                isAddActivity={false}
                categories={this.props.categories}
                handleActivitySubmit={this.props.handleActivitySubmit}
                handleDeleteActivity={this.props.handleDeleteActivity}
              />
            );
          })}
          {/* Add Activity */}
          <DailyActivity
            key={'addActivityDaily'}
            dayId={new Date().toDateString()}
            updateDay={this.props.updateDay}
            isAddActivity={true}
            categories={this.props.categories}
            handleActivitySubmit={this.props.handleActivitySubmit}
            theme={this.props.theme}
          />
        </DailyPageGridTag>
      </DailyPageTag>
    );
  }
}
export default DailyPage;
