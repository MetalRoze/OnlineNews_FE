import React from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const DesktopMenuList = () => {
    return (
        <StyledNavbar>
            <Container className="container">
                <Nav className="menu-items">
                    <Nav.Link href="/articleManage">기사</Nav.Link>
                    <Nav.Link href="/requestManage">승인</Nav.Link>
                    <Nav.Link href="/staffManage">직원</Nav.Link>
                    <Nav.Link href="/adminMypage">내 정보</Nav.Link>
                </Nav>
            </Container>
            <div className='side-menu' style={{ position: 'absolute', bottom: '0', left: '1rem' }}>
                <i className="bi bi-search mr1" style={{ cursor: 'pointer' }}  />
            </div>
        </StyledNavbar>
    );
};

// StyledNavbar 컴포넌트 정의
const StyledNavbar = styled(Navbar)`
    border-bottom: 1px solid ${(props) => props.theme.colors.gray50};
    padding: 0;
    position: relative;
    font-size: 1.25rem;
    background-color: ${(props) => props.theme.colors.white};
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.theme.colors.white};
    }
    .nav-color {
        background-color: ${(props) => props.theme.colors.white};
    }

    .nav-link {
        color: ${(props) => props.theme.colors.black};
    }
    .menu-items {
        display: flex;
        justify-content: center;
        gap: 20px;
    }
    .side-menu{
        height: 100%;
        display:flex;
        align-items:center;
        background-color: ${(props) => props.theme.colors.white};
    }
`;

export default DesktopMenuList;
