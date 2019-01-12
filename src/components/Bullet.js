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
    let className;
    if(this.props.isBeforeCreationDate === true){
      className = 'bullet--dead';
    }else if(this.props.isAfterToday === true){
      className = 'bullet--future';
    };
    const BulletTag = styled.div`
      background-color: rgba(
        ${this.props.colour},
        ${this.props.quantPercentFilled}
      );
    `;
    return <BulletTag  className = {`bullet ${className}`}/>;
  }
}
export default Bullet;
