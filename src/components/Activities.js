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
        dateCreated: new Date('2019/1/1'),
        colour: '255,0,0',
        days: [
          {
            date: new Date('2019/1/1'),
            notes: 'notehaha1',
            quantFilled: 1
          },
          {
            date: new Date('2019/1/2'),
            notes: 'notehaha1',
            quantFilled: 2
          },
          {
            date: new Date('2019/1/3'),
            notes: 'notehahassd1',
            quantFilled: 0.5
          },
          {
            date: new Date('2019/1/4'),
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
        dateCreated: new Date('2018/12/31'),
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

  generateDaysUntilToday() {
    // generate empty 'day' objects between last 'day' object and current date
    const activitiesList = [...this.state.activitiesList];

    activitiesList.map(activity => {
      // Sort activity.days to be in chronological order
      activity.days.sort((a, b) => (a.date > b.date ? 1 : -1));
      // Get latest day object from activity.days
      const latestDayObj = activity.days[activity.days.length - 1].date;
      const today = new Date();
      // Don't generate any days if latest day is today
      if (latestDayObj.toDateString() === today.toDateString()) return;
      let nextDay = new Date(latestDayObj);
      // Create newDays array to store generated days
      const newDays = [];
      // Build newDays array
      for (let i = 1; i <= dateDiff('d', latestDayObj, today); i++) {
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayObj = {
          date: new Date(nextDay),
          notes: '',
          quantFilled: 0
        };
        newDays.push(nextDayObj);
      }
      // Append newDays to activity.days
      activity.days.push(...newDays);
    });
    // Update state
    this.setState(activitiesList);
  }
}

export default Activities;
