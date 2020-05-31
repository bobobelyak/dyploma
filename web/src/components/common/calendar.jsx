import React from 'react';
import ReactCalendar, {MonthView} from 'react-calendar';

const Calendar = props => {
  const {input} = props;

  return (
    <ReactCalendar
      onChange={input.onChange}
      value={input.value}
      maxDetail="month"
      minDetail="month"
      next2Label={null}
      prev2Label={null}
      // showNavigation={false}
    />
  );
};

export default Calendar;
