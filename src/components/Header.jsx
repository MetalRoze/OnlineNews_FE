import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = ({ className }) => {
    return (
        <Navbar className={`${className} py-3`} data-bs-theme="dark">
            <div className="container">
                <Navbar.Brand href="#home">틀만 만들어 놨음</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Header;
