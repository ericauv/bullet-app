import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compareDayIdToActivityLiveRange } from '../Helper';

const DailyActivityDetailsTag = styled.div`
  display: grid;
  grid-template-rows: 20px minmax(20px, 1fr) minmax(20px, 2fr);
  grid-gap: 30px;
  padding-left: 5px;
  padding-right: 5px;
`;

class DailyActivityDetails extends React.Component {
  static propTypes = {
    activity: PropTypes.shape(),
    dayId: PropTypes.string,
    updateDay: PropTypes.func,
    isAddActivity: PropTypes.bool
  };

  render() {
    let activity, dayId, dayIdComparedToActivityLiveRange, day;
    if (this.props.isAddActivity === false) {
      activity = { ...this.props.activity };
      dayId = this.props.dayId;
      dayIdComparedToActivityLiveRange = compareDayIdToActivityLiveRange(
        activity.dateCreated,
        dayId
      );
      day =
        dayIdComparedToActivityLiveRange === 0 ? activity.days[dayId] : null;
    }
    return (
      <DailyActivityDetailsTag>
        {this.props.isAddActivity === true ? (
          <>
            <div>
              <h4>Create New Activity</h4>
            </div>
          </>
        ) : (
          <>
            <div>
              {day
                ? `${day.quantFilled}/${activity.quantTarget} ${activity.unit}`
                : 'Not a valid date for this activity.'}
            </div>
            <div>{day ? day.notes : 'Not a valid date for this activity.'}</div>
          </>
        )}
      </DailyActivityDetailsTag>
    );
  }
}
export default DailyActivityDetails;
