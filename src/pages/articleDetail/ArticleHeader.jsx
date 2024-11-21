import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuList from "../../components/MenuList";
import whiteLogo from '../../assets/myeongbo_white.svg';

const ArticleHeader = ({ id = 1 }) => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    };
    return (
        <div>
            <div className='mobile-header' style={{ backgroundColor: "var(--color-blue)", color: "var(--color-white)" }}>
                <div className='flex' style={{ alignItems: "center", width: '100%' }}>
                    <i onClick={() => navigate(-1)} className="bi bi-chevron-left block pointer" style={{ fontSize: '24px', color: 'var(--color-white' }} ></i>
                    <div style={{ flex: '1' }}></div>
                    <img src={whiteLogo} alt="Bootstrap" className='logo block' style={{ width: '7rem', cursor: 'pointer' }} onClick={handleLogoClick} />
                    <div style={{ flex: '1' }}></div>
                </div>
            </div>
            <MenuList backgroundColor="var(--color-blue)" textColor="var(--color-white)" prompCategory={id} />
        </div>

    );
};

export default ArticleHeader;
