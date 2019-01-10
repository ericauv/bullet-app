import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Bullet extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    colour: PropTypes.string,
    quantPercentFilled: PropTypes.number,
    isBeforeCreationDate: PropTypes.bool,
    isAfterToday: PropTypes.bool
  };

  render() {
    console.log(`background-color: rbga(${this.props.colour}, 1)`);

    const BulletTag = styled.div`
      background-color: rgba(
        ${this.props.colour},
        ${this.props.quantPercentFilled}
      );
    `;
    return <BulletTag className="bullet" />;
  }
}
export default Bullet;
