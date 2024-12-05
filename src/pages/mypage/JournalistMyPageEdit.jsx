import React, { useState, useEffect} from 'react';  // useState 임포트 확인
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getRequest } from '../../apis/axios'; 
import { patchRequest } from '../../apis/noCTAxios';

import profileIcon  from '../../assets/profileDefault.png'; 
import editIcon from '../../assets/editIcon.png'; 
import InputInfoModal from '../../components/InputInfoModal'; 

import PasswordInputModal from '../../components/PasswordInputModal';
import PhoneInputModal from '../../components/PhoneInputModal';


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
    margin-left:5px;
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

const EditIcon = styled.img`
    width:1.25rem;
    height:1.25rem;

    @media (max-width: 768px) {
        width:2.5vw; 
        height:2.5vw; 
    }
`; 

export default function JournalistMyPageEdit() {
    const location = useLocation(); 
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [currentLabel, setCurrentLabel] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [currentUserDataType, setCurrentUserDataType] = useState(''); 

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);

    // 전달된 userData가 있으면 초기 상태로 설정하고, 없으면 기본 상태값 사용
    const initialUserData = location.state?.userData || {
        name: '',
        bio: '',
        publisher:'',
        email: '',
        phoneNumber: '',
        gender: '',
        profileImg:''
    };

    const [userData, setUserData] = useState(initialUserData);
    const [previousUserData, setPreviousUserData] = useState(initialUserData);

    const [profileImgUrl, setProfileImgUrl] = useState(profileIcon);

    useEffect(() => {
        if (userData.profileImg instanceof File) {
            const newImgUrl = URL.createObjectURL(userData.profileImg);
            setProfileImgUrl(newImgUrl);

            return () => URL.revokeObjectURL(newImgUrl);
        } else if (typeof userData.profileImg === 'string') {
            setProfileImgUrl(userData.profileImg);
        }
    }, [userData.profileImg]);


    const getUserData = async () => {
        getRequest('/api/user/myPage')
            .then(response => {

                setUserData({
                    bio: response.data.bio,
                    name: response.data.name,
                    publihser: response.data.publihser, 
                    email: response.data.email,
                    phoneNumber: response.data.cp, 
                    gender: response.data.sex, 
                    profileImg : response.data.img
                });

                setPreviousUserData({
                    bio: response.data.bio,
                    name: response.data.name,
                    publihser: response.data.publihser, 
                    email: response.data.email,
                    phoneNumber: response.data.cp, 
                    gender: response.data.sex, 
                    profileImg : response.data.img
                });
            })

            .catch(error =>{
                console.error("회원 정보 불러오기 실패", error);
            });
        
    };

    useEffect(() => {
        // 전달된 userData가 없는 경우에만 API 호출
        if (!location.state) {
            getUserData(); 
        }
    }, [location.state]);



    const handleSave = () => {
        const formData = new FormData();

        // 기존 데이터와 비교하여 변경된 항목만 전송
        if (userData.profileImg !== previousUserData.profileImg) {
            formData.append('img', userData.profileImg);  // 프로필 이미지가 변경된 경우
            console.log("사진변경"); 
        }

        if (userData.phoneNumber !== previousUserData.phoneNumber) {
            formData.append('cp', userData.phoneNumber);  // 전화번호 변경된 경우
            console.log("전화번호변경"); 
        }

        if (userData.password && userData.password !== previousUserData.password) {
            formData.append('pw', userData.password);  // 비밀번호 변경된 경우
            console.log("번호변경"); 
        }

        if (userData.bio !== previousUserData.bio) {
            formData.append('bio', userData.bio);  // 자기소개 변경된 경우
            console.log("소개변경"); 
        }

        if (formData.has('img') || formData.has('nickname') || formData.has('cp') || formData.has('pw') || formData.has('bio')) {
            patchRequest('/api/user/myPage/edit', formData)
                .then(response => {
                    if(response.status === 200){
                        alert("회원정보 수정이 완료되었습니다!"); 
                    }
                })

                .catch(error => {
                    console.error('회원 정보 수정 실패:', error);
                })
        } else {
            console.log("변경된 항목이 없습니다.");
        }

    };

    const handleEditClick = (label, value, userDataType) => {
        setCurrentLabel(label);
        setCurrentValue(value);
        setCurrentUserDataType(userDataType); 
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setCurrentValue('');
    };

    const handleModalSave = (newValue) => {
        console.log(`새로운 값: ${newValue}`);

        setUserData((prevUserData) => ({
            ...prevUserData,
            [currentUserDataType]:newValue
        })); 
        handleModalClose();
    };

    const handleSavePassword = (newPassword) => {
        console.log("새 비밀번호:", newPassword);

        setUserData((prevUserData) => ({
            ...prevUserData,
            password:newPassword
        })); 
        setShowPasswordModal(false);
    };

    const handleSavePhone = (newPhone) => {
        console.log("새 전화번호:", newPhone);

        setUserData((prevUserData) => ({
            ...prevUserData,
            phoneNumber:newPhone
        })); 
        setShowPhoneModal(false);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserData((prevUserData) => ({
                ...prevUserData,
                profileImg: file
            }));
        }
    };

    const triggerFileInput = () => {
        document.getElementById('profileImageInput').click();
    };

    return (
        <div className='column mobile-container m0 pd20 aiCenter jfCcenter'>
            <ProfileWrapper>
            <ProfileImage 
                src={profileImgUrl || profileIcon} 
                onClick={triggerFileInput} 
                alt="Profile"
            />
            <input 
                type="file" 
                id="profileImageInput" 
                style={{ display: 'none' }} 
                accept="image/*" 
                onChange={handleImageUpload}
            />  
                <ProfileTextWrapper>
                    <NameWrapper>
                        <NameText>{userData.name}</NameText>
                        <EditSpace>
                        </EditSpace>
                    </NameWrapper>
                    <BioWrapper>
                        <VerticalLine />
                        <BioText>{userData.bio || '자기소개는 아직 없어요. 추가해보세요!'}</BioText>
                        <EditSpace onClick={() => handleEditClick('자기소개', userData.bio ,'bio' )}>
                            <EditIcon src={editIcon} />
                        </EditSpace>
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
                    <InfoText style={{color:'var(--color-black)'}}>{userData.phoneNumber}</InfoText>
                    <EditSpace onClick={() => setShowPhoneModal(true)}>
                        <EditIcon src={editIcon} />
                    </EditSpace>
                </InfoColumn>
                <InfoColumn>
                    <InfoLabel>비밀번호</InfoLabel>
                    <InfoText style={{color:'var(--color-black)'}}>********</InfoText>
                    <EditSpace onClick={() => setShowPasswordModal(true)}>
                        <EditIcon src={editIcon} />
                    </EditSpace>
                </InfoColumn>
                <InfoColumn>
                    <InfoLabel>성별</InfoLabel>
                    <InfoText>{userData.gender}</InfoText>
                    <EditSpace></EditSpace>
                </InfoColumn>
            </InfoWrapper>
            <HorizontalLine />
            <NextButton onClick={handleSave}>회원 정보 저장</NextButton>

            {/* 모달 컴포넌트 추가 */}
            <InputInfoModal
                showModal={showModal}
                handleClose={handleModalClose}
                titleLabel={currentLabel}
                value={currentValue}
                handleSave={handleModalSave}
            />
            <PasswordInputModal
                showModal={showPasswordModal}
                handleClose={() => setShowPasswordModal(false)}
                onSave={handleSavePassword}
            />
            <PhoneInputModal
                showModal={showPhoneModal}
                handleClose={() => setShowPhoneModal(false)}
                handleSave={handleSavePhone}
            />
        </div>
    );
}