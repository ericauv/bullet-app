import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Bullet extends React.Component {
  static propTypes = {
    activityIndex: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    colour: PropTypes.string,
    quantFilled: PropTypes.number,
    quantTarget: PropTypes.number,
    quantUnit: PropTypes.string,
    isBeforeCreationDate: PropTypes.bool,
    isAfterToday: PropTypes.bool,
    updateDay: PropTypes.func
  };

  handleClick = () => {
    // Do NOTHING if not a bullet that can be clicked
    if (this.props.isBeforeCreationDate || this.props.isAfterToday) return;
    // Determine whether filling or unfilling day
    const quantToFill = this.props.quantPercentFilled > 0 ? 0 : 1;
    // Update the day that corresponds to the clicked bullet
    this.props.updateDay(
      this.props.activityIndex,
      this.props.date,
      quantToFill
    );
  };

  styleBullet() {
    // return styled
    let bulletTag;

    // All Bullet
    const bullet = `
    width:22px;
    height:22px;
    max-width:100%;
    max-height:100%;
    border: 1px solid;
    border-radius: 2px 2px 2px 2px;`;

    // Live Bullet
    const bullet_live = styled.div`
      ${bullet}
      background-color: rgba(
        ${this.props.colour},
        ${(this.props.quantFilled / this.props.quantTarget) * 1.5}
    );`;

    // Dead Bullet (before creation date)
    const bullet_dead = styled.div`
      ${bullet}
      background:   /* On "top" */
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        #ccc 10px,
        #ccc 20px
      ),
      /* on "bottom" */
      linear-gradient(
        to bottom,
        black,
        #999
      );
      opacity: 0.2;
    `;

    // Future Bullet (after today)
    const bullet_future = styled.div`
      ${bullet}
      background: transparent;
      border: dashed 0.5px;
      opacity: 0.3;
    `;

    if (this.props.isBeforeCreationDate === true) {
      bulletTag = bullet_dead;
    } else if (this.props.isAfterToday === true) {
      bulletTag = bullet_future;
    } else {
      bulletTag = bullet_live;
    }
    return bulletTag;
  }

  render() {
    // Style the bullet tag based on if it is dead, future, or live bullet
    const BulletTag = this.styleBullet();
    return <BulletTag onClick={this.handleClick} />;
  }
}
export default Bullet;
