const sampleActivities = {
  1: {
    id: 1,
    name: 'React/ES6',
    desc: 'Do the lessons',
    quantTarget: 2,
    unit: 'lessons',
    category: 'Intellectual',
    dateCreated: new Date('2019/1/1').toDateString(),
    colour: '255,0,0',
    days: {
      [new Date('2019/1/1').toDateString()]: {
        notes: 'notehaha1',
        quantFilled: 1
      },
      [new Date('2019/1/2').toDateString()]: {
        notes: 'notehaha1',
        quantFilled: 2
      },
      [new Date('2019/1/3').toDateString()]: {
        notes: 'notehahassd1',
        quantFilled: 0.5
      },
      [new Date('2019/1/4').toDateString()]: {
        notes: 'notehahassd1',
        quantFilled: 0.5
      }
    }
  },
  2: {
    id: 2,
    name: 'JS30',
    desc: 'Do the lessons',
    quantTarget: 6,
    unit: 'lessons',
    category: 'Intellectual',
    dateCreated: new Date('2018/12/31').toDateString(),
    colour: '0,255,0',
    days: {
      [new Date('2019/01/01').toDateString()]: {
        notes: 'nddderotehaha1',
        quantFilled: 5
      },
      [new Date('2019/01/02').toDateString()]: {
        notes: 'notehaha123123',
        quantFilled: 2
      }
    }
  },
  3: {
    id: 3,
    name: 'CSS GRID',
    desc: 'Do the lessons!!!! CSS GRID MAN',
    quantTarget: 3,
    unit: 'lessons',
    category: 'Intellectual',
    dateCreated: new Date('2019/01/07').toDateString(),
    colour: '0,0,255',
    days: {
      [new Date('2019/01/07').toDateString()]: {
        notes: 'notehaha3',
        quantFilled: 1
      },
      [new Date('2019/01/08').toDateString()]: {
        notes: 'notehaha3',
        quantFilled: 1
      },
      [new Date('2019/01/09').toDateString()]: {
        notes: '123213notehaha111',
        quantFilled: 3
      }
    }
  }
};

export default sampleActivities;
