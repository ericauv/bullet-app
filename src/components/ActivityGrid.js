import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Bullet from './Bullet';
import { daysInMonth } from './Helper';

class ActivityGrid extends React.Component {
  static propTypes = {
    activity: PropTypes.shape({
      index: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      quantTarget: PropTypes.number,
      unit: PropTypes.string,
      category: PropTypes.string,
      dateCreated: PropTypes.instanceOf(Date),
      colour: PropTypes.string,
      days: PropTypes.array
    }),
    dateForGrid: PropTypes.instanceOf(Date),
    updateDay: PropTypes.func
  };

  getStartDayForActivityGrid(
    // Return first day that activity should have fillable bullets in GridMonthly for month of passed dateCheck date
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
    for (let i = 1; i <= startDay; i++) {
      const dateString = `'${gridYear}/${gridMonth}/${i}'`;
      bullets.push(
        <Bullet
          key={`${this.props.activity.name}_${dateString}_dead`}
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
    for (let i = dateForGrid.getDate(); i < numDaysInMonth; i++) {
      const dateString = `'${gridYear}/${gridMonth}/${i}'`;
      bullets.push(
        <Bullet
          key={`${this.props.activity.name}_${dateString}_future`}
          date={new Date(dateString)}
          isBeforeCreationDate={false}
          isAfterToday={true}
        />
      );
    }
    return bullets;
  }

  styleActivityGrid() {
    const activityGridTag = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
      grid-gap: 5px;
      max-width: 100%;
    `;
    return activityGridTag;
  }
  render() {
    /* Styling */
    const ActivityGridTag = this.styleActivityGrid();

    const activity = this.props.activity;
    const startDay = this.getStartDayForActivityGrid(
      activity.dateCreated,
      this.props.dateForGrid
    );
    return (
      <ActivityGridTag>
        {// Render 'dead' bullets prior to activity's start date
        this.generateDeadBullets(this.props.dateForGrid, startDay)}
        {// Render Bullets for fillable days
        activity.days.map(day => {
          return (
            <Bullet
              key={`${activity.name}_${day.date.toDateString()}`}
              activityIndex={activity.index}
              name={activity.name}
              date={day.date}
              colour={activity.colour}
              quantFilled={day.quantFilled}
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
