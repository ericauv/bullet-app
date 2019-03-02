import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputDay from './Dialogs/InputDay';
import { compareDayIdToActivityLiveRange } from './Helper';

const NotesTag = styled.div`
  position: absolute;
  left: 100%;
  top: -30%;
`;

// Tracks the length of a press/click on Bullet
let counter = 0;

// The max length of a 'click'
const clickBound = 25;

// The minimum length of a 'hold'
const holdBound = 35;

let intervalId = null;

class Bullet extends React.Component {
  state = {
    dialogIsOpen: false,
    dayExists: this.props.activity.days[this.props.dayId] || null,
    dayType: this.determineDayType(
      this.props.activity.dateCreated,
      this.props.dayId
    )
  };
  static propTypes = {
    activity: PropTypes.shape(),
    dayId: PropTypes.string,
    isBeforeCreationDate: PropTypes.bool,
    isAfterToday: PropTypes.bool,
    updateDay: PropTypes.func,
    bulletSize: PropTypes.number
  };
  componentDidMount() {
    // Create the day data if the day data doesn't exist
    if (this.state.dayType === 0 && !this.state.dayExists) {
      this.setState(
        { dayExists: true },
        this.updateDay(this.props.activity.id, this.props.dayId, 0, '')
      );
    }
  }

  determineDayType() {
    // If the type of day was passed down as a prop, use it for dayType
    if (this.props.isAfterToday) {
      return 1;
    } else if (this.props.isBeforeCreationDate) {
      return -1;
    } // Calculate the day type since it was not passed as a prop
    else
      return compareDayIdToActivityLiveRange(
        this.props.activity.dateCreated,
        this.props.dayId
      );
  }

  /* Determine Hold vs. Click press */
  pressingDown = e => {
    // Increment counter every 10 milliseconds
    intervalId = setInterval(this.timer, 10);
    e.preventDefault();
  };

  timer = () => {
    if (counter < holdBound) {
      // Increment the amount of time the user has held the bullet
      counter++;
    } else {
      // The user has held for the duration of a hold press
      this.firePressEvent(counter);
      counter = 0;
    }
  };

  notPressingDown = () => {
    if (intervalId) {
      // Only perform actions if the user had pressed a bullet
      // Stop the press timer from running
      clearInterval(intervalId);
      // Fire the event corresponding to the length of the press
      this.firePressEvent(counter);
      // Reset the press counter to 0
      counter = 0;
      intervalId = null;
    }
  };

  firePressEvent = counter => {
    if (intervalId) {
      // Stop running the timer function
      clearInterval(intervalId);
    }
    if (counter > 0 && counter <= clickBound) {
      // Fire the click event
      this.handleClickPress();
    } else if (counter >= holdBound) {
      // Fire the hold event
      this.handleHoldPress();
    }
  };

  /* Actions */
  handleClickPress = () => {
    // Fill or Unfill the day
    const activity = { ...this.props.activity };
    const dayId = this.props.dayId;
    const day = { ...activity.days[dayId] };
    // Open the dialog to update the day
    this.props.updateDay(
      activity.id,
      dayId,
      this.determineQuantToFill(activity.quantTarget, day.quantFilled),
      day.notes
    );
  };

  determineQuantToFill = (quantTarget, quantFilled) => {
    // Return 0 if the day has some quantFilled, return the activity's quantTarget if the day has no quantFilled
    return quantFilled > 0 ? 0 : quantTarget;
  };

  handleHoldPress = () => {
    // Open the day fill dialog
    this.setState({ dialogIsOpen: true });
  };

  handleCloseDialog = () => {
    // Close the day fill dialog
    this.setState({ dialogIsOpen: false });
  };

  render() {
    const dayExists = this.state.dayExists;
    const dayType = this.state.dayType;
    const activity = { ...this.props.activity };
    const dayId = this.props.dayId;
    const showNotes = dayType === 0 && dayExists && activity.days[dayId].notes;

    const DayTag = `
        position: relative;
        width: ${`${this.props.bulletSize || 22}px`};
        height: ${`${this.props.bulletSize || 22}px`};
        max-width: 100%;
        max-height: 100%;
        border: 1px solid;
        border-radius: ${this.props.bulletSize * 0.09 || 2}px
          ${this.props.bulletSize * 0.09 || 2}px
          ${this.props.bulletSize * 0.09 || 2}px
          ${this.props.bulletSize * 0.09 || 2}px;
      `;
    const DeadDayTag = styled.div`
      ${DayTag}
      background:   /* On "top" */ repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          #ccc 10px,
          #ccc 20px
        ),
        /* on "bottom" */ linear-gradient(to bottom, black, #999);
      opacity: 0.2;
    `;
    const FutureDayTag = styled.div`
      ${DayTag}
      background: transparent;
      border: dashed 1px;
      opacity: 0.3;
    `;

    /* Return Based on Day Type */
    if (dayType === 0) {
      // Active Day
      if (dayExists) {
        const ActiveDayTag = styled.div`
    ${DayTag}
          background-color: ${`rgba(${this.props.activity.colour},${parseFloat(
            this.props.activity.days[dayId].quantFilled
          ) / parseFloat(this.props.activity.quantTarget)})`};
          &:hover {
            cursor: pointer;
            transform: scale(1.15);
            transition: all 0.2s;
          }
        `;
        // Day Exists
        return (
          <div>
            <ActiveDayTag
              onMouseDown={this.pressingDown}
              onMouseUp={this.notPressingDown}
              onMouseLeave={this.notPressingDown}
              onTouchStart={this.pressingDown}
              onTouchEnd={this.notPressingDown}
            >
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
            </ActiveDayTag>
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
          </div>
        );
        // Day Doesn't Exist
      } else return <DayTag />;
    }
    // Dead Day (before creation date)
    else if (dayType === -1) {
      return <DeadDayTag />;
    }
    // Future Day (After today)
    else if (dayType === 1) {
      return <FutureDayTag />;
    }
  }
}

export default Bullet;

// render() {
//   const activity = { ...this.props.activity };
//   const dayId = this.props.dayId;
//   const dayIdComparedToActivityLiveRange = this.determineBulletType();

//   // Style the bullet tag based on if it is dead, future, or live bullet
//   const BulletTag = this.styleBullet(dayIdComparedToActivityLiveRange, dayId);
//   const showNotes =
//     dayIdComparedToActivityLiveRange === 0 && activity.days[dayId].notes;
//   return (
//     <div>
//       <BulletTag
//         onMouseDown={this.pressingDown}
//         onMouseUp={this.notPressingDown}
//         onMouseLeave={this.notPressingDown}
//         onTouchStart={this.pressingDown}
//         onTouchEnd={this.notPressingDown}
//       >
//         {showNotes ? (
//           <NotesTag bulletSize={this.props.bulletSize}>
//             <div
//               style={{
//                 border: '1px solid black',
//                 width: '10px',
//                 height: '10px',
//                 fontSize: '8px',
//                 textAlign: 'center',
//                 borderRadius: '50% 50% 50% 50%'
//               }}
//             >
//               i
//             </div>
//           </NotesTag>
//         ) : null}
//       </BulletTag>
//       {dayIdComparedToActivityLiveRange === 0 ? (
//         <InputDay
//           open={this.state.dialogIsOpen}
//           quantFilled={activity.days[dayId].quantFilled}
//           quantTarget={activity.quantTarget}
//           unit={activity.unit}
//           notes={activity.days[dayId].notes}
//           activityId={activity.id}
//           activityName={activity.name}
//           dayId={dayId}
//           updateDay={this.props.updateDay}
//           handleCloseDialog={this.handleCloseDialog}
//         />
//       ) : null}
//     </div>
//   );
// }
