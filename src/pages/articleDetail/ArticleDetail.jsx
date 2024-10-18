import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const HeaderWrapper = styled.div`
    width: 600px;
    padding: 10px; 
    background-color: var(--color-blue);
    color: var(--color-white); 
`;

const ArticleDetail = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <HeaderWrapper>
                <div className='flex' style={{alignItems:"left"}}>
                    <div>
                    <i onClick={() => navigate(-1)} className="bi bi-chevron-left" 
                      style={{ fontSize: '24px', cursor: 'pointer', marginRight: '10px' }} ></i></div>
                    <h2>왕왕일보</h2>
                </div>
                <div className='flex spaceBetween'>

                </div>
            </HeaderWrapper>
        </div>

    );
};

export default ArticleDetail;
