import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackgroundImage from '../../assets/staffDetailBackground.png';
import JournalistMyPage from './JournalistMyPage';
import ProfileInfo from '../staffManage/ProfileInfo';
import EditProfileInfo from './EditProfileInfo';
import { getRequest } from '../../apis/axios';


export default function AdminMypage() {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
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
    const [userData, setUserData] = useState({
        name: '',
        bio: '',
        publisher: '',
        email: '',
        phoneNumber: '',
        gender: '',
        profileImg: ''
    });
    const getUserData = async () => {
        getRequest('/api/user/myPage')
            .then(response => {
                setUserData({
                    name: response.data.name,
                    bio: response.data.bio,
                    publisher: response.data.publisher,
                    email: response.data.email,
                    phoneNumber: response.data.cp,
                    gender: response.data.sex,
                    profileImg: response.data.img
                });

                console.log(response.data);
            })
            .catch(error => {
                console.error("회원 정보 불러오기 실패", error);
            });
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container aiCenter" style={{ padding: 0 }}>
                <StyledBackground>
                    {userData && <h1>{userData.publisher}</h1>}
                </StyledBackground>
                <div className='desktop-detail aiCenter boxShadow'>
                    <div className='mr1 mt1' style={{ alignSelf: 'flex-end' }}>
                        <i className="bi bi-pencil-square pointer" onClick={handleEditClick}></i>
                    </div>
                    {userData && (edit ? <EditProfileInfo user={userData} /> : <ProfileInfo user={userData} />)}

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