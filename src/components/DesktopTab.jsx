import React from 'react';
import styled from 'styled-components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const StyledTabs = styled(Tabs)`
    width: 35rem;
    border: none;
    
  .nav-link {
    padding: 0;
    width: 7rem;
    color: ${(props) => props.theme.colors.gray50};
    background-color: transparent;
    border: none;
    text-align:left;
    &:hover,
    &.active {
      font-weight: 600;
      color: ${(props) => props.theme.colors.black};
      text-decoration: underline;
    }
  }
  .tab-content {
    border: none;
    padding: 20px;
  }
`;

export default function DesktopTab() {
    return (
        <StyledTabs
            defaultActiveKey="profile"
            className="mb-3"
        >
            <Tab eventKey="전체 요청" title="전체 요청">
                Tab content 전체 요청
            </Tab>
            <Tab eventKey="승인" title="승인">
                Tab content for 승인
            </Tab>
            <Tab eventKey="보류" title="보류">
                Tab content for 보류
            </Tab>
            <Tab eventKey="거절" title="거절">
                Tab content for 거절
            </Tab>
            <Tab eventKey="미열람" title="미열람">
                Tab content for 미열람
            </Tab>
        </StyledTabs>
    );
}
