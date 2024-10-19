import React from 'react';
import styled from 'styled-components';
import SearchBar from '../../components/SearchBar';
import Sidebar from '../../components/Sidebar';
import DesktopTab from '../../components/DesktopTab';

export default function RequestManage() {
    return (
        <div className="flex" style={{ width: "100vw" }}>
            <Sidebar />
            <div className="desktop-container">
                <SearchBar />
                <div style={{ height: '3rem' }}></div>
                <DesktopTab/>
                
            </div>
        </div>
    );
}
const StyledRequestWrapper = styled.div`
  
`;
