import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Bullet extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    colour: PropTypes.string,
    quantPercentFilled: PropTypes.number
  };

  render() {
    const BulletTag = styled.div`
      background: ${this.props.colour};
      opacity: ${this.props.quantPercentFilled};
      width: 50px;
      height: 50px;
      border: 1px solid;
      border-radius: 2px 2px 2px 2px;
    `;
    return <BulletTag />;
  }
}
export default Bullet;
