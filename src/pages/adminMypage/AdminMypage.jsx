import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackgroundImage from '../../assets/staffDetailBackground.png';
import ProfileInfo from '../staffManage/ProfileInfo';
import { getRequest } from '../../apis/axios';
import editIcon from '../../assets/editIcon.png';

export default function AdminMypage() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState();
    const [edit, setEdit] = useState(false);

    const fetchUserInfo = async () => {
        try {
            const response = await getRequest(`/api/user/myPage`)
            setUserInfo(response.data);
        } catch (error) {
            console.error('사용자 요청실패', error);
        }
    };

    const changeBtnClick = async (e) => {
        e.preventDefault();
        navigate('/main');
    };

    const handleEditClick = async (e) => {
        setEdit(true);
    };

    const handleLogoutClick = () => {
        sessionStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/adminMain');
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container aiCenter" style={{ padding: 0 }}>
                <StyledBackground>
                    {userInfo && (
                        <h1>{userInfo.publisher}</h1>
                    )}
                </StyledBackground>
                <div className='desktop-detail aiCenter boxShadow'>
                    <div className='mr1 mt1'style={{alignSelf:'flex-end'}}>
                        <i className="bi bi-pencil-square pointer" onClick={handleEditClick}></i>
                    </div>
                    {/* <img src={editIcon} style={{ width: '15px' }} /> */}
                    <div>

                    </div>
                    {userInfo && <ProfileInfo user={userInfo} />}

                    <div style={{ height: '2rem' }} />

                    <div className='flex mb2' style={{ gap: '1rem' }}>
                        <button className='desktop-request-privatebutton' onClick={handleLogoutClick}>로그아웃</button>
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