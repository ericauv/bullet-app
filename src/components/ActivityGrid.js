import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Bullet from './Bullet';
import { daysInMonth } from './Helper';

class ActivityGrid extends React.Component {
  state = {
    activity: {},
    dateForGrid: null
  };

  static propTypes = {
    activity: PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
      quantTarget: PropTypes.number,
      unit: PropTypes.string,
      category: PropTypes.string,
      dateCreated: PropTypes.instanceOf(Date),
      colour: PropTypes.string,
      days: PropTypes.array
    }),
    dateForGrid: PropTypes.instanceOf(Date)
  };

  generateDeadBullets(startDay = 1) {
    if (startDay <= 1) return; // Don't generate dead bullets, since all bullets for the month will be live
    const bullets = [];
    for (let i = 1; i <= startDay; i++) {
      bullets.push(<div key={i} className="bullet bullet--dead" />);
    }
    return bullets;
  }

  generateFutureBullets(dateForGrid) {
    const numDaysInMonth = daysInMonth(
      dateForGrid.getMonth(),
      dateForGrid.getFullYear()
    );
    const bullets = [];
    for (let i = dateForGrid.getDate(); i < numDaysInMonth; i++) {
      bullets.push(<div key={i} className="bullet bullet--future" />);
    }
    return bullets;
  }
  render() {
    /* Styling */
    const ActivityGridTag = styled.div`
      display: grid;
      grid-template-columns: repeat(
        ${daysInMonth(
          // Number of columns in grid = number of days in this month
          this.props.dateForGrid.getMonth(),
          this.props.dateForGrid.getFullYear()
        )},
        minmax(20px, 1fr)
      );
      grid-gap: 5px;
      max-width: 100%;
    `;

    function getStartDayForActivityGrid(
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

    const activity = this.props.activity;
    const startDay = getStartDayForActivityGrid(
      activity.dateCreated,
      this.props.dateForGrid
    );
    return (
      <ActivityGridTag>
        {// Generate 'dead' bullets prior to activity's start date
        this.generateDeadBullets(startDay)}
        {activity.days.map((day, i) => {
          // Render Bullet for current day
          return (
            <Bullet
              key={`${activity.name}-${day.date}`}
              name={activity.name}
              date={day.date}
              colour={activity.colour}
              quantPercentFilled={
                (day.quantFilled / activity.quantTarget) * 1.5
              }
            />
          );
        })}
        {// Generate 'future' bullets for this month after today's date
        this.generateFutureBullets(this.props.dateForGrid)}
      </ActivityGridTag>
    );
  }
}

export default ActivityGrid;
