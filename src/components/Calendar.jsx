import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import styled from 'styled-components';
import moment from "moment";

export default function MyCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <StyledCalendarWrapper>
      <Calendar 
      locale="ko"
      onChange={onChange} 
      value={value} 
      formatDay={(locale, date) => moment(date).format("D")}
      formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
      calendarType="gregory"
      showNeighboringMonth={false}
      minDetail="year"
      selectRange={false}
      />
    </StyledCalendarWrapper>
  );
}

export const StyledCalendarWrapper = styled.div`
  width: 25rem;
  display: flex;
  justify-content: center;
  position: relative;

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 1rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: ${(props) => props.theme.colors.gray10};
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: ${(props) => props.theme.colors.gray50};
      font-size: 1rem;
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }
 
  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    color: ${(props) => props.theme.colors.blue};
  }
  /* 날짜 */
  .react-calendar__navigation__label > span{
     color: ${(props) => props.theme.colors.black};
     font-weight: 900;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:hover,
  .react-calendar__navigation button:focus {
    color: ${(props) => props.theme.colors.blue};
    background: none;
  }

  .react-calendar__navigation__next2-button,
  .react-calendar__navigation__prev2-button {
    display: none;
}
  /* 타일 */
  .react-calendar__tile {
    font-size: 1rem;
    text-align: center;
    height: 2rem;
    width: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.colors.gray50};
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 900;
    color: ${(props) => props.theme.colors.black};
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background: none;
    abbr {
      font-weight: 900;
      color: ${(props) => props.theme.colors.blue};
    }
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: rgba(0,122,255,0.15);
    abbr{
    color: ${(props) => props.theme.colors.blue};
    font-weight: 900;
    }
  }
`;



