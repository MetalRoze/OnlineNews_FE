import React, { useState, useEffect } from 'react';  // useState 임포트 확인
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getRequest } from '../../apis/axios';
import profileIcon  from '../../assets/profileDefault.png'; 


const ProfileWrapper = styled.div`
    width: 100%; 
    max-width:80%;
    margin: 0 auto; 
    margin-top: 30px;
    height: 100%; 
    display: flex;
    flex-direction: row; 
    justify-content: center;
    align-items: center; 
    padding: 0 20px;

    @media (max-width: 768px) {
        max-width:100%;
    }

`;

const ProfileTextWrapper = styled.div`
    width: 100%;
    max-width:65%; 
    display: flex;
    margin: 0px 10px;
    flex-direction: column; 
    justify-content: flex-start; 
    align-items: flex-start; 

    @media (max-width: 768px) {
        margin: 0 1vh;
    }

`;

const ProfileImage = styled.img`
    max-width:35%; 
    padding:5px;
    aspect-ratio: 1;
    margin: 0px 20px;
    border-radius: 50%;

    @media (max-width: 768px) {
        margin: 0 2vh;
    }
`;

const NameWrapper = styled.div`
    width:100%; 
    display:flex;
    flex-direction:row; 
    justify-content: space-between;
    align-items: center;

`; 

const NameText = styled.h1`
    font-size: 2rem;
    width:100%; 

    @media (max-width: 768px) {
        font-size: 5vw;
        max-font-size:2em; 
    }
`;

const BioWrapper = styled.div`
    width:100%;
    display:flex; 
    flex-direction:row; 
`;

const VerticalLine = styled.div`
    max-height: 100%;
    margin-top:1px;
    margin-right:15px; 
    border: 1px solid black; 
`; 

const HorizontalLine = styled.div`
    border-top: 1px solid var(--color-gray50);
    width:100%;
    max-width:80%;
    margin: 20px 0; 
`; 


const BioText = styled.p`
    width:100%; 
    font-size:1.2rem;    

    @media (max-width: 768px) {
        font-size: 3vw;
    }
`; 

const InfoWrapper = styled.div`
    width:100%;
    max-width:80%;
    margin: 20px auto;
    height: auto; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 

    @media (max-width: 768px) {
        max-width:90%;
        margin: 5vw auto;
    }
`;

const InfoColumn = styled.div`
    width: 100%;
    height: auto;
    margin: 5px;
    display: flex;
    flex-direction: row;
    padding: 0px 10px;
    align-items: flex-start;
    flex-wrap: wrap; 
    @media (max-width: 768px) {
        margin: 0.2vw;
    }
`;


const InfoLabel = styled.p`
    flex: 0 0 35%;  
    word-break: break-word; 
    margin: 0 20px;
    padding: 10px;
    font-size: 1.25rem;
    font-weight: 400;
    display: flex;
    justify-content: flex-start;

    @media (max-width: 768px) {
        font-size: 3.5vw;
        max-font-size:1.25rem;
        margin: 0 5vw;
    }
`;

const InfoText = styled.p`
    flex: 1;
    font-size: 1.25rem;
    font-weight: 400;
    margin: 0px 10px;
    padding: 10px;
    color: var(--color-gray50); 
    word-break: break-word;  
    white-space: normal;  
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        font-size: 3.5vw;
        max-font-size:1.25rem;
        margin: 0;
    }
`;

const EditSpace = styled.div`
    width:1.25rem;
    height:1.25rem;
    margin-top:10px;
    margin-bottom:20px; 
    display:flex;
    flex-direction:column;
    align-items: center; 
    justify-content:center;

    @media (max-width: 768px) {
        width:2.5vw; 
        height:2.5vw; 
        margin-top:2vw;
        margin-bottom:5vw; 
    }
`; 

const NextButton = styled.button`
    padding:10px;
    margin: 10px;
    width:100%;
    max-width:80%;
    background-color: var(--color-gray40);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.3rem;
    font-weight:300;

    @media (max-width: 768px) {
        font-size: 3.5vw;
        max-font-size:1.3rem; 
    
    }
`;

export default function JournalistMyPage() {
    const navigate = useNavigate(); 
    const [userData, setUserData] = useState({
        name: '',
        bio: '',
        publisher:'',
        email: '',
        phoneNumber: '',
        gender: '',
        profileImg:''
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
                    profileImg:response.data.img
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

    const handleEditInfo = () => {
        navigate('/myPageJournalist/edit', {state: {userData}});
    };

    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        alert('로그아웃되었습니다.');
        navigate('/main');
    };

    const handleDeleteAccount = () => {
        if (window.confirm('정말로 회원 탈퇴하시겠습니까?')) {
            alert('회원 탈퇴가 완료되었습니다.');
            navigate('/main'); 
        }
    };

    return (
        <div className='column mobile-container m0 pd20 aiCenter jfCcenter'>
            <ProfileWrapper>
                 <ProfileImage 
                    src={userData.profileImg || profileIcon}
                >
                </ProfileImage>
                <ProfileTextWrapper>
                    <NameWrapper>
                    <NameText>{userData.name}</NameText>
                        <EditSpace></EditSpace>
                    </NameWrapper>
                    <BioWrapper>
                        <VerticalLine></VerticalLine>
                        <BioText>{userData.bio || '자기소개는 아직 없어요. 추가해보세요!'}</BioText>
                        <EditSpace></EditSpace>
                    </BioWrapper>
                </ProfileTextWrapper>
            </ProfileWrapper>

            <InfoWrapper>
                <InfoColumn>
                    <InfoLabel>소속</InfoLabel>
                    <InfoText>{userData.publisher }</InfoText>
                    <EditSpace></EditSpace>
                </InfoColumn>
                <InfoColumn>
                    <InfoLabel>이메일</InfoLabel>
                    <InfoText>{userData.email }</InfoText>
                    <EditSpace></EditSpace>
                </InfoColumn>
                <InfoColumn>
                    <InfoLabel>휴대폰 번호</InfoLabel>
                    <InfoText>{userData.phoneNumber}</InfoText>
                    <EditSpace></EditSpace>
                </InfoColumn>
                <InfoColumn>
                    <InfoLabel>비밀번호</InfoLabel>
                    <InfoText>********</InfoText>
                    <EditSpace></EditSpace>
                </InfoColumn>
                
                <InfoColumn>
                    <InfoLabel>성별</InfoLabel>
                    <InfoText>{userData.gender}</InfoText>
                    <EditSpace></EditSpace>
                </InfoColumn>
            </InfoWrapper>
            <HorizontalLine></HorizontalLine>
            <NextButton onClick={handleEditInfo}>정보수정</NextButton>
            <NextButton onClick={handleLogout}>로그아웃</NextButton>
            <NextButton onClick={handleDeleteAccount}>회원 탈퇴</NextButton>
        </div>
    
    ); 

}