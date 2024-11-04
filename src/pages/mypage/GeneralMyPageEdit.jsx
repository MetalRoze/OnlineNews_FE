import React, { useState} from 'react';  // useState 임포트 확인
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import profileIcon  from '../../assets/profileDefault.png'; 
import editIcon from '../../assets/editIcon.png'; 
import InputInfoModal from '../../components/InputInfoModal'; 

import PasswordInputModal from '../../components/PasswordInputModal';
import PhoneInputModal from '../../components/PhoneInputModal';

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
    width:300px; 
    color: var(--color-gray50); 
`; 

const EditIcon = styled.img`
    width:15px;
    height:15px; 
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


export default function GeneralMyPageEdit() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [currentLabel, setCurrentLabel] = useState('');
    const [currentValue, setCurrentValue] = useState('');

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);

    const handleSave = () => {
        navigate('/myPageGeneral');
    };

    const handleEditClick = (label, value) => {
        setCurrentLabel(label);
        setCurrentValue(value);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setCurrentValue('');
    };

    const handleModalSave = (newValue) => {
        console.log(`새로운 값: ${newValue}`);
        handleModalClose();
    };

    const handleSavePassword = (newPassword) => {
        console.log("새 비밀번호:", newPassword);
        setShowPasswordModal(false);
    };

    const handleSavePhone = (newPhone) => {
        console.log("새 전화번호:", newPhone);
        setShowPhoneModal(false);
    };

    return (
        <div className='column mobile-container m0 pd20 aiCenter jfCcenter'>
            <ProfileWrapper>
                <ProfileImage src={profileIcon} />
                <ProfileTextWrapper>
                    <NameWrapper>
                        <NameText>닉네임</NameText>
                        <EditSpace onClick={() => handleEditClick('닉네임', '현재 닉네임')}>
                            <EditIcon src={editIcon} />
                        </EditSpace>
                    </NameWrapper>
                    <BioWrapper>
                        <VerticalLine />
                        <BioText>자기소개가 오는 자리입니다. 최대 25자입니다.</BioText>
                        <EditSpace onClick={() => handleEditClick('자기소개', '현재 자기소개')}>
                            <EditIcon src={editIcon} />
                        </EditSpace>
                    </BioWrapper>
                </ProfileTextWrapper>
            </ProfileWrapper>

            <InfoWrapper>
                <InfoColumn>
                    <InfoLabel>이름</InfoLabel>
                    <InfoText>홍길동</InfoText>
                    <EditSpace></EditSpace>
                </InfoColumn>
                <InfoColumn>
                    <InfoLabel>이메일</InfoLabel>
                    <InfoText>hong12@gmail.com</InfoText>
                    <EditSpace></EditSpace>
                </InfoColumn>
                <InfoColumn>
                    <InfoLabel>휴대폰 번호</InfoLabel>
                    <InfoText style={{color:'var(--color-black)'}}>000-1111-2222</InfoText>
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
                    <InfoText>남성</InfoText>
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