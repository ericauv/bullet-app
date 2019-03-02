import React from 'react';
import PropTypes from 'prop-types';
import ActivityName from '../ActivityName';
import Bullet from '../Bullet';
import {
  daysInMonth,
  sortedDaysArrayFromDaysKeys,
  isSameMonthAndYear,
  compareMonthsTrinary
} from '../Helper';

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
    handleActivitySubmit: PropTypes.func,
    handleDeleteActivity: PropTypes.func,
    GridTag: PropTypes.shape(),
    bulletSize: PropTypes.number,
    categories: PropTypes.arrayOf(PropTypes.string),
    colours: PropTypes.shape()
  };

  generateDeadBullets(activity, dateForGrid) {
    const compareMonths = compareMonthsTrinary(
      dateForGrid,
      activity.dateCreated
    );

    if (compareMonths === 1) {
      // dateForGrid month is after activity.dateCreated, all bullets will be live so don't generate any dead bullets
      return null;
    }
    const gridYear = dateForGrid.getFullYear();
    const gridMonth = dateForGrid.getMonth();
    let lastDeadDay;
    if (compareMonths === -1) {
      // dateForGrid Month is before activity creation month, all bullets will be dead
      lastDeadDay = daysInMonth(gridMonth, gridYear) + 1;
    } else if (compareMonths === 0) {
      // dateForGrid Month is same month as activity creation, last day should be day before creation date
      lastDeadDay = new Date(activity.dateCreated).getDate() - 1;
    }
    const bullets = [];
    for (let i = 1; i <= lastDeadDay; i++) {
      const dateString = `'${gridYear}/${gridMonth}/${i}'`;
      bullets.push(
        <Bullet
          activity={this.props.activity}
          key={`${activity.id}_${dateString}_dead`}
          dayId={new Date(dateString).toDateString()}
          isBeforeCreationDate={true}
          isAfterToday={false}
          bulletSize={this.props.bulletSize || 22}
        />
      );
    }
    return bullets;
  }

  generateFutureBullets(dateForGrid) {
    if (compareMonthsTrinary(dateForGrid, new Date()) === -1) {
      // dateForGrid month is before today's month, don't generate any future bullets
      return null;
    }
    const gridYear = dateForGrid.getFullYear();
    const gridMonth = dateForGrid.getMonth();
    const bullets = [];
    for (
      let i = dateForGrid.getDate() + 1;
      i <= daysInMonth(gridMonth, gridYear);
      i++
    ) {
      const dateString = `'${gridYear}/${gridMonth}/${i}'`;
      bullets.push(
        <Bullet
          activity={this.props.activity}
          key={`${this.props.activity.id}_${dateString}_future`}
          dayId={new Date(dateString).toDateString()}
          isBeforeCreationDate={false}
          isAfterToday={true}
          bulletSize={this.props.bulletSize || 22}
        />
      );
    }
    return bullets;
  }

  render() {
    const activity = this.props.activity;

    const sortedDays = sortedDaysArrayFromDaysKeys(Object.keys(activity.days));
    const GridTag = this.props.GridTag;
    return (
      <GridTag>
        <ActivityName
          activity={activity}
          colours={this.props.colours}
          categories={this.props.categories}
          handleActivitySubmit={this.props.handleActivitySubmit}
          handleDeleteActivity={this.props.handleDeleteActivity}
        />
        {// Render 'dead' bullets prior to activity's start date
        this.generateDeadBullets(this.props.activity, this.props.dateForGrid)}
        {// Render Bullets for fillable days
        sortedDays.map(dayId => {
          if (isSameMonthAndYear(dayId, this.props.dateForGrid)) {
            return (
              <Bullet
                key={`${activity.id}_${dayId}`}
                activity={activity}
                dayId={dayId}
                isBeforeCreationDate={false}
                isAfterToday={false}
                updateDay={this.props.updateDay}
                bulletSize={this.props.bulletSize || 22}
              />
            );
          } else {
            return null;
          }
        })}
        {// Render 'future' bullets for this month after today's date
        this.generateFutureBullets(this.props.dateForGrid)}
      </GridTag>
    );
  }
}

export default ActivityGrid;
