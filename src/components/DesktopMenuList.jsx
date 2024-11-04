import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const DesktopMenuList = () => {
    const categories = ['승인', '기사', '직원'];
    const paths = ['requestManage', 'articleManage', 'staffManage'];

    return (
        <div className="desktop-container">
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="/">메뉴</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link href="/articleManage">기사</Nav.Link>
                        <Nav.Link href="/requestManage">승인</Nav.Link>
                        <Nav.Link href="/staffManage">직원</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default DesktopMenuList;
