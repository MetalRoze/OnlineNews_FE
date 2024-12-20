import React from 'react';
import styled from 'styled-components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const StyledTabs = styled(Tabs)`
    width: fit-content;
    border: none;
  .nav-link {
    width: auto;
    padding: 1rem 1rem 1rem 0rem;
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

`;

export default function DesktopTab({ tabData, activeTab, setActiveTab }) {
  return (
    <StyledTabs activeKey={activeTab} onSelect={(key) => setActiveTab(key)} className="mb-3">
      {tabData.map((tab) => (
        <Tab eventKey={tab.eventKey} title={tab.title} key={tab.eventKey} />
      ))}
    </StyledTabs>
  );
}
