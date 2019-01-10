import React from 'react';
import { dateDiff } from './Helper';
class Activities extends React.Component {
  state = {
    // Test Activities Data
    activitiesList: [
      {
        name: 'React/ES6',
        desc: 'Do the lessons',
        quantTarget: 2,
        unit: 'lessons',
        category: 'Intellectual',
        dateCreated: new Date('2019/01/03'),
        colour: '255,0,0',
        days: [
          {
            date: new Date('2019/01/4'),
            notes: 'notehaha1',
            quantFilled: 1
          },
          {
            date: new Date('2019/01/5'),
            notes: 'notehaha1',
            quantFilled: 2
          },
          {
            date: new Date('2019/01/6'),
            notes: 'notehahassd1',
            quantFilled: 0.5
          },
          {
            date: new Date('2019/01/7'),
            notes: 'notehahassd1',
            quantFilled: 0.5
          }
        ]
      },
      {
        name: 'JS30',
        desc: 'Do the lessons',
        quantTarget: 6,
        unit: 'lessons',
        category: 'Intellectual',
        dateCreated: new Date('2018/01/30'),
        colour: '0,255,0',
        days: [
          {
            date: new Date('2019/01/01'),
            notes: 'nddderotehaha1',
            quantFilled: 5
          },
          {
            date: new Date('2019/01/02'),
            notes: 'notehaha123123',
            quantFilled: 2
          }
        ]
      },
      {
        name: 'CSS GRID',
        desc: 'Do the lessons!!!! CSS GRID MAN',
        quantTarget: 3,
        unit: 'lessons',
        category: 'Intellectual',
        dateCreated: new Date('2019/01/07'),
        colour: '0,0,255',
        days: [
          {
            date: new Date('2019/01/08'),
            notes: 'notehaha3',
            quantFilled: 1
          },
          {
            date: new Date('2019/01/09'),
            notes: '123213notehaha111',
            quantFilled: 3
          }
        ]
      }
    ]
  };

  generateFillableDays() {
    // generate empty 'day' objects between last 'day' object and current date
    const activitiesList = [...this.state.activitiesList];

    activitiesList.map(activity => {
      // Get latest day object from activity [NOTE: ASSUMES ACTIVITY DAYS ARE SORTED IN CHRONOLOGICAL ORDER!]
      // !!! TODO SORT ACTIVITY DAYS IN CHRONOLOGICAL ORDER
      const latestDayObj = activity.days[activity.days.length - 1].date;
      const today = new Date();
      // Don't generate any days if latest day is today
      if (latestDayObj.toDateString() === today.toDateString()) return;
      // start generating days at first day of this month unless there are already days data in this month
      let latestDay = 0;
      if (
        latestDayObj.getYear() === today.getYear() &&
        latestDayObj.getMonth() === today.getMonth()
      ) {
        latestDay = latestDayObj.getDate();
      }
      let nextDay = new Date(latestDayObj);
      const newDays = [];
      // Build new days array
      for (let i = 1; i <= today.getDate() - latestDay; i++) {
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayObj = {
          date: new Date(nextDay),
          notes: '',
          quantFilled: 0
        };
        newDays.push(nextDayObj);
      }
      // Append new days to activity
      activity.days.push(...newDays);
    });
    this.state = { activitiesList };
  }
}

export default Activities;
