import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import profileIcon  from '../../assets/profileDefault.png'; 
import { getRequest, postRequest, deleteRequest } from '../../apis/axios';
import MailingSettingModal from '../../components/MailingSettingModal'; // 추가된 import

const ProfileWrapper = styled.div`
    width: 500px; 
    height:200px; 
    display:flex;
    flex-direction:row; 
    justify-content:center;
    align-items:center; 
`; 

const ProfileTextWrapper = styled.div`
    width: 250px; 
    display:flex;
    margin: 0px 10px;
    flex-direction:column; 
    justify-content:left; 
    align-items:left; 
`;

const ProfileImage = styled.img`
    width: 150px; 
    height: 150px; 
    margin: 0px 30px;
    border-radius: 50%;  
`; 

const NameWrapper = styled.div`
    width:100%; 
    display:flex;
    flex-direction:row; 
    margin: 10px 0px;
`; 

const NameText = styled.h1`
    font-size:2.25rem;
    width:100%; 
`; 

const BioWrapper = styled.div`
    width:250px;
    display:flex; 
    flex-direction:row; 
`; 

const VerticalLine = styled.div`
    height: 50px;
    margin-top:1px;
    margin-right:15px; 
    border: 1px solid black; 
`; 

const HorizontalLine = styled.div`
    border-top: 1px solid var(--color-gray50);
    width: 450px; 
    margin: 20px 0; 
`; 

const BioText = styled.p`
    width:100%; 
    font-size:1.2rem;
    height: 50px;
`; 

const InfoWrapper = styled.div`
    width: 500px; 
    height: 400px; 
    display: flex;
    flex-direction:column;
    align-items: center; 
    justify-content:center;
    padding: 20px 40px;
    `; 

const InfoColumn = styled.div`
    width:500px; 
    margin:10px;
    display:flex;
    flex-direction:row; 
    padding: 0px 40px;
`; 

const InfoLabel = styled.p`
    font-size:1.5rem;
    font-weight:400;
    width:200px; 
`; 

const InfoText = styled.p`
    font-size:1.5rem;
    font-weight:400;
    margin-left:10px;
    width:250px; 
    color: var(--color-gray50); 

`; 

const EditSpace = styled.div`
    width:30px;
    height:20px; 
    margin-top:10px;
    margin-bottom:20px; 
    display:flex;
    flex-direction:column;
    align-items: center; 
    justify-content:center;
`; 

const NextButton = styled.button`
    padding:10px;
    margin: 10px;
    width: 400px;
    background-color: var(--color-gray40);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.3rem;
    font-weight:300;
`; 


export default function GeneralMyPage() {
    const navigate = useNavigate(); 
    const [userData, setUserData] = useState({
        id:'', 
        nickname: '',
        bio: '',
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
        profileImg:'', 
        isMailing: false
    });

    const getUserData = async () => {
        getRequest('/api/user/myPage')
            .then(response => {
                setUserData({
                    id:response.data.id, 
                    nickname: response.data.nickname,
                    bio: response.data.bio,
                    name: response.data.name,
                    email: response.data.email,
                    phoneNumber: response.data.cp, 
                    gender: response.data.sex, 
                    profileImg : response.data.img, 
                    isMailing : response.data.mailing 
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
        navigate('/myPageGeneral/edit', { state: { userData } });
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

    const [showMailingModal, setShowMailingModal] = useState(false); // 모달 상태
    const [mailingStatus, setMailingStatus] = useState(userData.isMailing); // 메일링 수신 여부

     // 메일링 수신 여부 변경 후 저장
    const handleMailingSave = async (newStatus) => {
        setMailingStatus(newStatus);
        setShowMailingModal(false);

        const userId = userData.id; 

        try {
            if (newStatus) {
                // 수신 설정
                postRequest(`/api/mailing/subscribe?userId=${userData.id}`, { status: newStatus })
                    .then(response => {
                        console.log("메일링 수신 여부 변경:", newStatus);
                    })
                    .catch(error => {
                        console.error("메일링 수신 설정 실패", error);
                    });
            } else {
                // 수신 해지
                deleteRequest(`/api/mailing/unsubscribe?userId=${userData.id}`)
                    .then(response => {
                        console.log("메일링 수신 해지 완료");
                    })
                    .catch(error => {
                        console.error("메일링 수신 해지 실패", error);
                    });
            }
        } catch (error) {
            console.error("메일링 수신 여부 변경 실패:", error);
        }

        console.log("메일링 수신 여부 변경:", newStatus);
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
                    <NameText>{userData.nickname || '익명'}</NameText>
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
                    <InfoLabel>이름</InfoLabel>
                    <InfoText>{userData.name }</InfoText>
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
           
            {/* 메일링 수신 설정 버튼 추가 */}
            <NextButton onClick={() => setShowMailingModal(true)}>메일링 수신 설정</NextButton>
            <NextButton onClick={handleEditInfo}>정보수정</NextButton>
            <NextButton onClick={handleLogout}>로그아웃</NextButton>
            <NextButton onClick={handleDeleteAccount}>회원 탈퇴</NextButton>
        

            {/* 메일링 수신 설정 모달 */}
            <MailingSettingModal 
                showModal={showMailingModal}
                handleClose={() => setShowMailingModal(false)}
                isSubscribed={mailingStatus}
                handleSave={handleMailingSave}
            />

        </div>
    
    ); 

}