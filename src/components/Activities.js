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
        dateCreated: new Date('2019/01/03'),
        colour: 'yellow',
        days: [
          {
            date: new Date('2019/01/4'),
            notes: 'notehaha1',
            quantFilled: 1
          },
          {
            date: new Date(),
            notes: 'notehaha1',
            quantFilled: 2
          },
          {
            date: new Date(),
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
        colour: 'orange',
        days: [
          {
            date: new Date(),
            notes: 'nddderotehaha1',
            quantFilled: 5
          },
          {
            date: new Date(),
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
        dateCreated: new Date('2019/01/05'),
        colour: 'red',
        days: [
          {
            date: new Date(),
            notes: 'notehaha3',
            quantFilled: 1
          },
          {
            date: new Date(),
            notes: '123213notehaha111',
            quantFilled: 3
          }
        ]
      }
    ]
  };
}

export default Activities;
