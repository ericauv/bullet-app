import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Bullet from './Bullet';

class MonthlyGrid extends React.Component {
  static propTypes = {
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        desc: PropTypes.string,
        quantTarget: PropTypes.number,
        unit: PropTypes.string,
        category: PropTypes.string,
        dateCreated: PropTypes.instanceOf(Date),
        colour: PropTypes.string,
        days: PropTypes.array
      })
    ),
    dateForGrid: PropTypes.instanceOf(Date)
  };

  render() {
    const activities = this.props.activities;
    const MonthlyGridTag = styled.div`
      display: grid;
      grid-gap: 8px;
    `;
    const ActivityGridTag = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fill, 50px);
      grid-gap: 8px;
      width: 100%;
    `;
    function getStartDayForActivityGrid(
      // Return first day that activity should have fillable bullets in GridMonthly for month of passed dateCheck date
      activity = { dateCreated: new Date() },
      dateForGrid = new Date()
    ) {
      const activityCreated = activity.dateCreated;
      // return 1 if the activity was not created in the same month as the passed dateForGrid
      if (
        !(
          dateForGrid.getYear() === activityCreated.getYear() &&
          dateForGrid.getMonth() === activityCreated.getMonth()
        )
      ) {
        return 1;
      }
      // Return the day that the activity was created
      return activityCreated.getDate();
    }

    function generateDeadBullets(startDay = 1) {
      if (startDay <= 1) return; // Don't generate dead bullets, since all bullets for the month will be live
      const deadBullets = [];
      for (let i = 1; i <= startDay; i++) {
        deadBullets.push(
          <div className='bullet bullet-dead' style={{ width: '50px', height: '50px', background: 'black', opacity:'0.3', border: 'black', borderRadius: '2px 2px 2px 2px' }} />
        );
      }
      return deadBullets;
    }

    // Map through activities
    return (
      <MonthlyGridTag>
        {activities.map(activity => {
          const startDay = getStartDayForActivityGrid(activity);
          return (
            <ActivityGridTag>
              {
                // Fill 'dead' bullets prior to activity's start date
                generateDeadBullets(startDay)}
              {
                // Map days for current activity
                activity.days.map(day => {
                // Render Bullet for current day
                return (
                  <Bullet
                    name={activity.name}
                    date={day.date}
                    colour={activity.colour}
                    quantPercentFilled={
                      (day.quantFilled / activity.quantTarget) * 1.5
                    }
                  />
                );
              })}
            </ActivityGridTag>
          );
        })}
      </MonthlyGridTag>
    );
  }
}

export default MonthlyGrid;
