import React from 'react';
import DesktopHeader from '../../components/DesktopHeader';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DesktopMenuList from '../../components/DesktopMenuList';

export default function AdminMain() {
    const navigate = useNavigate();
    
    const goToRequest = () => {
        navigate('/requestManage');
    };
    const goToArticle = () => {
        navigate('/articleManage');
    };
    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container">
            <DesktopHeader/>
            <DesktopMenuList/>
            </div>
        </div>
    );
}
const StyledRequestListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr); 
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
`;
const StyledArticleListWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr); 
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
`;