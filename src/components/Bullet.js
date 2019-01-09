import React from 'react';
import PropTypes from 'prop-types';

class Bullet extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    date: PropTypes.number,
    colour: PropTypes.string,
    quantPercentFilled: PropTypes.number
  };

  render() {
    const { name, date, colour, quantPercentFilled } = { ...this.props };
    const divStyle = {
      background: colour
    };
    return (
      <div class="bullet" style={divStyle}>
        name:{name} | date: {date} | colour: {colour} | fill:{' '}
        {quantPercentFilled}{' '}
      </div>
    );
  }
}
export default Bullet;
