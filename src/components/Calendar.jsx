import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import styled from 'styled-components';
import moment from "moment";

export default function MyCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <StyledCalendarWrapper>
      <Calendar onChange={onChange} value={value} formatDay={(locale, date) => moment(date).format("D")}/>
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
    background-color: #F2F2F7;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: #AEAEB2;
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }
 
  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    color:#007AFF;
    font-size: 1rem;
  }
  /* 날짜 */
  .react-calendar__navigation__label > span{
     color: black;
     font-size: 1rem;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    color:#007AFF;
  }

  .react-calendar__tile {
    text-align: center;
    height: 2rem;
    width: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 900;
    color: black;
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background: none;
    abbr {
      font-weight: 900;
      color:#007AFF;
    }
  }


  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => props.theme.gray_1};
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: rgba(0,122,255,0.15);
    abbr{
    color: #007AFF;
    font-weight: 900;
    }
  }
`;



