import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuList from "../../components/MenuList";
import whiteLogo from '../../assets/myeongbo_white.svg';

const ArticleHeader = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    };
    return (
        <div>
            <div className='mobile-header' style={{ backgroundColor: "var(--color-blue)", color: "var(--color-white)" }}>
                <div className='flex' style={{ alignItems: "center", justifyContent: "center", width: '100%' }}>
                    <i onClick={() => navigate(-1)} className="bi bi-chevron-left block"
                        style={{ fontSize: '24px', cursor: 'pointer', color: 'var(--color-white',  position: 'absolute', left: '1rem'  }} ></i>
                    <img src={whiteLogo} alt="Bootstrap" className='logo block' style={{ width: '7rem', cursor: 'pointer' }} onClick={handleLogoClick} />
                </div>
            </div>
            <MenuList backgroundColor="var(--color-blue)" textColor="var(--color-white)" />
        </div>

    );
};

export default ArticleHeader;
