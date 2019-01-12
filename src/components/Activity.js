import React from 'react';
import PropTypes from 'prop-types';

class Activity extends React.Component {
  state = {
    name: null,
    desc: null,
    quantTarget: null,
    unit: null,
    category: null,
    dateCreated: null,
    colour: null,
    days: [
      {
        date: Date.now(),
        notes: null,
        quantFilled: null
      }
    ]
  };

  static propTypes = {
    name: PropTypes.string,
    desc: PropTypes.string,
    quantTarget: PropTypes.number,
    unit: PropTypes.string,
    category: PropTypes.string,
    dateCreated: PropTypes.string,
    colour: PropTypes.string,
    days: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.number,
        notes: PropTypes.string,
        quantFilled: PropTypes.number
      })
    )
  };
}