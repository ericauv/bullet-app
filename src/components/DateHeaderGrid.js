import React from 'react';
import styled from 'styled-components';
import { daysInMonth } from './Helper';

const DateHeaderGrid = ({ monthName, month, year }) => {
  /* Styling */
  const DateHeaderGridTag = styled.div`
    display: grid;
    grid-template-columns: minmax(100px, 5fr) repeat(
        auto-fit,
        minmax(20px, 1fr)
      );
    grid-gap: 5px;
    max-width: 100%;
  `;
  const DayTag = styled.div`
    width: 22px;
    height: 22px;
    max-width: 100%;
    max-height: 100%;
    display: grid;
    align-items: center;
    justify-content: center;
  `;
  // Populate array of day numbers for this month
  const dayNumbers = [];
  for (let i = 1; i <= daysInMonth(month, year); i++) {
    dayNumbers.push(i);
  }
  //Return Tags
  return (
    <DateHeaderGridTag>
      <div>{monthName}</div>
      {dayNumbers.map(dayNumber => (
        <DayTag key={dayNumber}>{dayNumber}</DayTag>
      ))}
    </DateHeaderGridTag>
  );
};
export default DateHeaderGrid;
