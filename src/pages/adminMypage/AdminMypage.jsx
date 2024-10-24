import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';


export default function AdminMypage() {

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <Sidebar />
            <div className="desktop-container jcCenter aiCenter">
                <StyledProfileWrapper>
                    <div className='flex aiCenter'>
                        <img src="https://placehold.co/50x50" alt="publisher" className='br10 mr05' />
                        <h5 className='m0'>어쩌고일보</h5>
                    </div>
                    <hr />
                    <div className='desktop-item aiCenter jcCenter' style={{ position: 'relative', width: '100%' }}>
                        <img src="https://placehold.co/100x100" className='br10 mr1' />
                        <div className='flex column jcCenter' >
                            <h5>김철수 편집장</h5>
                            <div className='flex'>
                                <div className='flex mr1' >
                                    <i className="bi bi-envelope mr05"></i>
                                    <small className='m0 '>wlstj9317@naver.com</small>
                                </div>
                                <div className='flex'>
                                    <i className="bi bi-telephone mr05"></i>
                                    <small className='m0 '>010-2843-9317</small>
                                </div>
                            </div>
                            <i className="bi bi-pencil-square" style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer' }}></i>
                        </div>
                    </div>
                </StyledProfileWrapper>
                <div className='flex mt1' style={{ alignSelf: 'center' }}>
                    <button className='mr05'>로그아웃</button>
                    <button>계정전환</button>
                </div>
            </div>
        </div>
    );
}

const StyledProfileWrapper = styled.div`
    width: 80%;
    background-color:  ${(props) => props.theme.colors.gray10};
    padding: 1rem;
`;
