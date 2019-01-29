import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EditActivity from './Dialogs/EditActivity';
import DeleteActivity from './Dialogs/DeleteActivity';
import Bullet from './Bullet';
import {
  daysInMonth,
  sortedDaysArrayFromDaysKeys,
  isSameMonthAndYear,
  compareMonthsTrinary
} from './Helper';

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
    categories: PropTypes.arrayOf(PropTypes.string),
    GridTag: PropTypes.shape()
  };

  getStartDayForActivityGrid(
    // Return first day that activity should have fillable bullets in GridMonthly
    activityDateCreated = new Date(),
    dateForGrid = new Date()
  ) {
    // TODO: compareMonthsTrinary -- 0 start date if before
    // return 1 if the activity was not created in the same month as the passed dateForGrid
    if (!isSameMonthAndYear(dateForGrid, activityDateCreated)) {
      return 1;
    }
    // Return the day that the activity was created
    return activityDateCreated.getDate();
  }
  generateDeadBullets(dateForGrid, startDay = 1) {
    // TODO: if startDate 0 -- all bullets Dead
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
    if (compareMonthsTrinary(dateForGrid, new Date()) === -1) {
      return null;
    }
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
    const ActivityNameTag = styled.div`
      display: grid;
      background-color: rgb(${this.props.activity.colour});
      background-size: 10%;
      ${this.props.activity.colour === this.props.colours.black
        ? `color:white;`
        : null}
      @media only screen and (min-width: 1101px) {
        grid-template-columns: minmax(90px, 3fr) 1fr 1fr;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        max-width: 100%;
      }
      @media only screen and (max-width: 1100px) {
        writing-mode: vertical-lr;
        grid-template-columns: minmax(90px, 3fr) 1fr 1fr;
        align-items: center;
        justify-items: start;
      }
    `;
    const activity = this.props.activity;
    const startDay = this.getStartDayForActivityGrid(
      new Date(activity.dateCreated),
      this.props.dateForGrid
    );
    const sortedDays = sortedDaysArrayFromDaysKeys(Object.keys(activity.days));
    const GridTag = this.props.GridTag;
    return (
      <GridTag>
        <ActivityNameTag>
          <span>{this.props.activity.name}</span>
          <EditActivity
            activity={this.props.activity}
            categories={this.props.categories}
            handleActivitySubmit={this.props.handleActivitySubmit}
            isAddActivity={false}
            style={{ maxWidth: '100%' }}
            colours={this.props.colours}
          />
          <DeleteActivity
            activity={this.props.activity}
            categories={this.props.categories}
            showTextInButton={false}
            handleDeleteActivity={this.props.handleDeleteActivity}
          />
        </ActivityNameTag>
        {// Render 'dead' bullets prior to activity's start date
        this.generateDeadBullets(this.props.dateForGrid, startDay)}
        {// Render Bullets for fillable days
        sortedDays.map(dayId => {
          if (isSameMonthAndYear(dayId, this.props.dateForGrid)) {
            return (
              <Bullet
                key={`${activity.id}_${dayId}`}
                activityId={activity.id}
                activityName={activity.name}
                name={activity.name}
                date={dayId}
                quantFilled={activity.days[dayId].quantFilled}
                quantTarget={activity.quantTarget}
                quantUnit={activity.unit}
                notes={activity.notes}
                isBeforeCreationDate={false}
                isAfterToday={false}
                updateDay={this.props.updateDay}
                backgroundColor={`rgba(${activity.colour},${parseFloat(
                  activity.days[dayId].quantFilled
                ) / parseFloat(activity.quantTarget)})`}
              />
            );
          }
        })}
        {// Render 'future' bullets for this month after today's date
        this.generateFutureBullets(this.props.dateForGrid)}
      </GridTag>
    );
  }
}

export default ActivityGrid;
