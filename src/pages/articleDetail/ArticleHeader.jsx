import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MenuList from "../../components/MenuList";

const ArticleHeader = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='mobile-header' style={{ backgroundColor: "var(--color-blue)", color: "var(--color-white)" }}>
                <div className='flex' style={{ alignItems: "center", justifyContent: "flex-start", width: '100%' }}>
                    <i onClick={() => navigate(-1)} className="bi bi-chevron-left"
                        style={{ fontSize: '24px', cursor: 'pointer', color: 'var(--color-white' }} ></i>
                    <h2 style={{ margin: '0 auto' }}>왕왕일보</h2>
                </div>
            </div>
            <MenuList backgroundColor="var(--color-blue)" textColor="var(--color-white)" />
        </div>

    );
};

export default ArticleHeader;
