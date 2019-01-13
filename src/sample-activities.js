const sampleActivities = [
  {
    index: `activity1`,
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
    index: `activity2`,
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
    index: `activity3`,
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
];

export default sampleActivities;
