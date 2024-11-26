import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackgroundImage from '../../assets/staffDetailBackground.png';
import JournalistMyPage from './JournalistMyPage';
import { getRequest } from '../../apis/axios';


export default function AdminMypage() {
    const navigate = useNavigate();
    const changeBtnClick = async (e) => {
        e.preventDefault();
        navigate('/main');
    };

    const [publisher, setPublisher] = useState();
    const getUserData = async () => {
        try{
            const response = await getRequest('/api/user/myPage');
            setPublisher(response.data.publisher);
        }catch{
            console.error("회원 정보 불러오기 실패", error);
        }
    
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container aiCenter" style={{ padding: 0 }}>
                <StyledBackground>
                    {publisher && <h1>{publisher}</h1>}
                </StyledBackground>
                <div className='desktop-detail aiCenter boxShadow'>
                    <JournalistMyPage />

                    <div style={{ height: '2rem' }} />

                    <div className='flex mb2' style={{ gap: '1rem' }}>
                        <button className='desktop-request-privatebutton' onClick={changeBtnClick}>화면전환</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const StyledBackground = styled.div`
    width: 100%;
    height: 35vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(${BackgroundImage});
    background-size: cover;
    background-position: center;
    margin-bottom: -3.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
`;