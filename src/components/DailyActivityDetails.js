import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DailyActivityDetailsTag = styled.div`
  display: grid;
  grid-template-rows: 20px minmax(50px, 2fr) minmax(50px, 3fr);
`;

class DailyActivityDetails extends React.Component {
  static propTypes = {
    quantFilled: PropTypes.number,
    quantTarget: PropTypes.number,
    unit: PropTypes.string,
    notes: PropTypes.string,
    activityId: PropTypes.string,
    activityName: PropTypes.string,
    date: PropTypes.string,
    updateDay: PropTypes.func
  };

  render() {
    const activity = { ...this.props.activity };
    console.log(activity.days);

    const day = { ...activity.days[this.props.dayId] };
    return (
      <DailyActivityDetailsTag>
        <div>
          {day.quantFilled}/{activity.quantTarget} {activity.unit}
        </div>
        <div>{day.notes}</div>
      </DailyActivityDetailsTag>
    );
  }
}
export default DailyActivityDetails;
