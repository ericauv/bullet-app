import React from 'react';
import styled from 'styled-components';
import { daysInMonth } from './Helper';

/* Styling */
const MonthTag = styled.h4`
  @media only screen and (min-width: 1100px) {
    margin-bottom: 0;
  }
  @media only screen and (max-width: 1100px) {
    writing-mode: vertical-lr;
    margin-left: 0;
  }
`;

const DayTag = styled.div`
  width: 24px;
  height: 24px;
  max-width: 100%;
  max-height: 100%;
  display: grid;
  align-self: end;
  align-content: end;
  justify-content: center;
  @media only screen and (max-width: 1100px) {
  }
`;
const DateHeaderGrid = ({ monthName, month, year, GridTag }) => {
  // Populate array of day numbers for this month
  const dayNumbers = [];
  for (let i = 1; i <= daysInMonth(month, year); i++) {
    dayNumbers.push(i);
  }
  //Return Tags
  return (
    <GridTag>
      <MonthTag>{`${monthName} ${year}`}</MonthTag>
      {dayNumbers.map(dayNumber => (
        <DayTag key={dayNumber}>{dayNumber}</DayTag>
      ))}
    </GridTag>
  );
};
export default DateHeaderGrid;
