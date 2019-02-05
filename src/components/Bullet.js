import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputDay from './Dialogs/InputDay';

class Bullet extends React.Component {
  state = {
    dialogIsOpen: false
  };
  static propTypes = {
    activityId: PropTypes.number,
    activityName: PropTypes.string,
    date: PropTypes.string,
    quantFilled: PropTypes.number,
    quantTarget: PropTypes.number,
    unit: PropTypes.string,
    notes: PropTypes.string,
    isBeforeCreationDate: PropTypes.bool,
    isAfterToday: PropTypes.bool,
    updateDay: PropTypes.func,
    backgroundColor: PropTypes.string,
    bulletSize: PropTypes.number
  };

  styleBullet() {
    // return styled
    let bulletTag;

    // All Bullet
    const bullet = `
      width:${`${this.props.bulletSize || 22}px`};
      height:${`${this.props.bulletSize || 22}px`};
      max-width:100%;
      max-height:100%;
      border: 1px solid;
      border-radius: ${this.props.bulletSize * 0.09 || 2}px ${this.props
      .bulletSize * 0.09 || 2}px ${this.props.bulletSize * 0.09 || 2}px ${this
      .props.bulletSize * 0.09 || 2}px;
    `;

    // Live Bullet
    const bullet_live = styled.div`
                            ${bullet}
                            background-color: ${this.props.backgroundColor};
                            &:hover {
                              cursor: pointer;
                              transform:scale(1.15);
                              transition: all 0.2s;
                            }
                            `;

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
      border: dashed 1px;
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

  handleClick = () => {
    // Do NOTHING if not a bullet that can be clicked
    if (this.props.isBeforeCreationDate || this.props.isAfterToday) return;

    // Open the dialog to update the day
    this.handleOpenDialog();
  };

  handleOpenDialog = () => {
    this.setState({ dialogIsOpen: true });
  };
  handleCloseDialog = () => {
    this.setState({ dialogIsOpen: false });
  };

  render() {
    // Style the bullet tag based on if it is dead, future, or live bullet
    const BulletTag = this.styleBullet();
    return (
      <div>
        <BulletTag onClick={this.handleClick} />
        <InputDay
          open={this.state.dialogIsOpen}
          quantFilled={this.props.quantFilled}
          quantTarget={this.props.quantTarget}
          unit={this.props.unit}
          notes={this.props.notes}
          activityId={this.props.activityId}
          activityName={this.props.activityName}
          date={this.props.date}
          updateDay={this.props.updateDay}
          handleCloseDialog={this.handleCloseDialog}
        />
      </div>
    );
  }
}
export default Bullet;
