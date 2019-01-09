import React from 'react';

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
        dateCreated: Date.now(),
        colour: 'yellow',
        days: [
          {
            date: Date.now(),
            notes: 'notehaha1',
            quantFilled: 1
          },
          { date: Date.now(), notes: 'notehaha1', quantFilled: 2 }
        ]
      },
      {
        name: 'JS30',
        desc: 'Do the lessons',
        quantTarget: 6,
        unit: 'lessons',
        category: 'Intellectual',
        dateCreated: Date.now(),
        colour: 'orange',
        days: [
          {
            date: Date.now(),
            notes: 'nddderotehaha1',
            quantFilled: 5
          },
          {
            date: Date.now(),
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
        dateCreated: Date.now(),
        colour: 'red',
        days: [
          {
            date: Date.now(),
            notes: 'notehaha3',
            quantFilled: 1
          },
          {
            date: Date.now(),
            notes: '123213notehaha111',
            quantFilled: 3
          }
        ]
      }
    ]
  };
}

export default Activities;
