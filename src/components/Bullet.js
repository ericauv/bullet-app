import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputDay from './Dialogs/InputDay';
import { compareDayIdToActivityLiveRange } from './Helper';

const NotesTag = styled.div`
  position: absolute;
  left: 100%;
  top: -30%;
  /* transform: translateY(${props => `${-0.2 * props.bulletSize || -5}px`}; */
`;

class Bullet extends React.Component {
  state = {
    dialogIsOpen: false
  };
  static propTypes = {
    activity: PropTypes.shape(),
    dayId: PropTypes.string,
    isBeforeCreationDate: PropTypes.bool,
    isAfterToday: PropTypes.bool,
    updateDay: PropTypes.func,
    bulletSize: PropTypes.number
  };

  determineBulletType() {
    if (this.props.isAfterToday) {
      return 1;
    } else if (this.props.isBeforeCreationDate) {
      return -1;
    } else
      return compareDayIdToActivityLiveRange(
        this.props.activity.dateCreated,
        this.props.dayId
      );
  }

  styleBullet(dayIdComparedToActivityLiveRange, dayId) {
    // All Bullet
    const bullet = `
    position:relative;
    width:${`${this.props.bulletSize || 22}px`};
    height:${`${this.props.bulletSize || 22}px`};
    max-width:100%;
    max-height:100%;
    border: 1px solid;
    border-radius: ${this.props.bulletSize * 0.09 || 2}px ${this.props
      .bulletSize * 0.09 || 2}px ${this.props.bulletSize * 0.09 || 2}px ${this
      .props.bulletSize * 0.09 || 2}px;
        `;

    if (dayIdComparedToActivityLiveRange === 0) {
      // Live Bullet
      return styled.div`
                            ${bullet}
                            background-color: ${`rgba(${
                              this.props.activity.colour
                            },${parseFloat(
                              this.props.activity.days[dayId].quantFilled
                            ) / parseFloat(this.props.activity.quantTarget)})`};
                            &:hover {
                              cursor: pointer;
                              transform:scale(1.15);
                              transition: all 0.2s;
                            }
                            `;
    } else if (dayIdComparedToActivityLiveRange < 0) {
      // Dead Bullet (before creation date)
      return styled.div`
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
    } else {
      // Future Bullet (after today)
      return styled.div`
        ${bullet}
        background: transparent;
        border: dashed 1px;
        opacity: 0.3;
      `;
    }
  }

  handleClick = () => {
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
    const activity = { ...this.props.activity };
    const dayId = this.props.dayId;
    const dayIdComparedToActivityLiveRange = this.determineBulletType();

    // Style the bullet tag based on if it is dead, future, or live bullet
    const BulletTag = this.styleBullet(dayIdComparedToActivityLiveRange, dayId);
    const showNotes =
      dayIdComparedToActivityLiveRange === 0 && activity.days[dayId].notes;
    return (
      <div>
        <BulletTag onClick={this.handleClick}>
          {showNotes ? (
            <NotesTag bulletSize={this.props.bulletSize}>
              <div
                style={{
                  border: '1px solid black',
                  width: '10px',
                  height: '10px',
                  fontSize: '8px',
                  textAlign: 'center',
                  borderRadius: '50% 50% 50% 50%'
                }}
              >
                i
              </div>
            </NotesTag>
          ) : null}
        </BulletTag>
        {dayIdComparedToActivityLiveRange === 0 ? (
          <InputDay
            open={this.state.dialogIsOpen}
            quantFilled={activity.days[dayId].quantFilled}
            quantTarget={activity.quantTarget}
            unit={activity.unit}
            notes={activity.days[dayId].notes}
            activityId={activity.id}
            activityName={activity.name}
            dayId={dayId}
            updateDay={this.props.updateDay}
            handleCloseDialog={this.handleCloseDialog}
          />
        ) : null}
      </div>
    );
  }
}
export default Bullet;
