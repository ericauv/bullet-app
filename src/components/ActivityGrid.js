import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Bullet from './Bullet';
import ToolTip from './Tooltip';
import EditActivity from './Dialogs/EditActivity';
import { daysInMonth, sortedDaysArrayFromDaysKeys } from './Helper';

/* Styling */
const ActivityGridTag = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, 5fr) repeat(auto-fit, minmax(20px, 1fr));
  grid-gap: 5px;
  max-width: 100%;
`;
// const ActivityNameTag = styled.div`
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   overflow: hidden;
//   &:hover {
//   }
// `;

class ActivityGrid extends React.Component {
  state = {};

  static propTypes = {
    activity: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      desc: PropTypes.string,
      quantTarget: PropTypes.number,
      unit: PropTypes.string,
      category: PropTypes.string,
      dateCreated: PropTypes.string,
      colour: PropTypes.string,
      days: PropTypes.object
    }),
    dateForGrid: PropTypes.instanceOf(Date),
    updateDay: PropTypes.func,
    handleActivitySubmit: PropTypes.func
  };

  getStartDayForActivityGrid(
    // Return first day that activity should have fillable bullets in GridMonthly
    activityDateCreated = new Date(),
    dateForGrid = new Date()
  ) {
    // return 1 if the activity was not created in the same month as the passed dateForGrid
    if (
      !(
        dateForGrid.getYear() === activityDateCreated.getYear() &&
        dateForGrid.getMonth() === activityDateCreated.getMonth()
      )
    ) {
      return 1;
    }
    // Return the day that the activity was created
    return activityDateCreated.getDate();
  }
  generateDeadBullets(dateForGrid, startDay = 1) {
    if (startDay <= 1) return; // Don't generate dead bullets, since all bullets for the month will be live
    const gridYear = dateForGrid.getFullYear();
    const gridMonth = dateForGrid.getMonth();
    const bullets = [];
    for (let i = 1; i < startDay; i++) {
      const dateString = `'${gridYear}/${gridMonth}/${i}'`;
      bullets.push(
        <Bullet
          key={`${this.props.activity.id}_${dateString}_dead`}
          date={new Date(dateString)}
          isBeforeCreationDate={true}
          isAfterToday={false}
        />
      );
    }
    return bullets;
  }

  generateFutureBullets(dateForGrid) {
    const gridYear = dateForGrid.getFullYear();
    const gridMonth = dateForGrid.getMonth();
    const numDaysInMonth = daysInMonth(gridMonth, gridYear);
    const bullets = [];
    for (let i = dateForGrid.getDate() + 1; i <= numDaysInMonth; i++) {
      const dateString = `'${gridYear}/${gridMonth}/${i}'`;
      bullets.push(
        <Bullet
          key={`${this.props.activity.id}_${dateString}_future`}
          date={new Date(dateString)}
          isBeforeCreationDate={false}
          isAfterToday={true}
        />
      );
    }
    return bullets;
  }
  render() {
    const activity = this.props.activity;
    const startDay = this.getStartDayForActivityGrid(
      new Date(activity.dateCreated),
      this.props.dateForGrid
    );
    const sortedDays = sortedDaysArrayFromDaysKeys(Object.keys(activity.days));
    return (
      <ActivityGridTag>
        <EditActivity
          buttonText={this.props.activity.name}
          activity={this.props.activity}
          handleActivitySubmit={this.props.handleActivitySubmit}
        />
        {// Render 'dead' bullets prior to activity's start date
        this.generateDeadBullets(this.props.dateForGrid, startDay)}
        {// Render Bullets for fillable days
        sortedDays.map(dayId => {
          return (
            <Bullet
              key={`${activity.id}_${dayId}`}
              activityId={activity.id}
              name={activity.name}
              date={dayId}
              colour={activity.colour}
              quantFilled={activity.days[dayId].quantFilled}
              quantTarget={activity.quantTarget}
              quantUnit={activity.unit}
              isBeforeCreationDate={false}
              isAfterToday={false}
              updateDay={this.props.updateDay}
            />
          );
        })}
        {// Render 'future' bullets for this month after today's date
        this.generateFutureBullets(this.props.dateForGrid)}
      </ActivityGridTag>
    );
  }
}

export default ActivityGrid;
