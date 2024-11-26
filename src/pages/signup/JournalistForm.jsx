import React, { useState } from 'react';  // useState 임포트 확인
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import profileIcon  from '../../assets/profileDefault.png'; 
import profileResetIcon from '../../assets/x-square.svg'; 

import { postRequest } from '../../apis/noCTAxios';

const InputContainer = styled.div`
    max-width:400px;
    max-height:600px;
    overflow-y:auto;
    scrollbar-width: none;
    margin-bottom:10px;
    padding:0px 5px 20px 5px;
`; 

const TitleWrapper = styled.div`
    width:100%; 
    max-width:400px; 
    display:flex; 
    flex-direction:column; 
    justify-content : left;
    alitn-items:left; 
`; 

const Title = styled.h1`
    margin-bottom: 10px; 
    text-align: left; 
`;

const SubTitle = styled.p`
    font-size: 1.25rem;
    margin-bottom: 20px; 
    text-align: left; 
    color: var(--color-black); 
    padding-bottom: 20px; 
`;

const NextButton = styled.button`
    padding:10px;
    width: 400px;
    background-color: var(--color-gray40);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
`; 

const SmallRedText = styled.span`
    font-weight:normal; 
    font-size:smaller; 
    color: var(--color-red); 
`; 

const SmallText = styled.span`
    font-weight:normal; 
    font-size:smaller; 
`; 

const InputWrapper = styled.div`
    width:100%; 
    max-width:400px; 
`; 

const InputLabel = styled.div`
    font-weight:500;
    font-size:1.125rem; 
    margin-bottom:10px;
`; 

const PasswordDescription = styled.div`
    margin-top:-5px;
    margin-left: 5px; 
    margin-bottom: 10px;
    font-size:smaller;
    color: var(--color-gray50);
`; 

const PhoneInputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin-bottom:10px;
`;

const RadioGroup = styled.div`
    display: flex;
    justify-content: start;
    gap: 20px;
    margin: 15px 0px;
`;

const RadioLabel = styled.label`
    font-size: 1rem;
`;


const PhoneInput = styled.input`
    width: 30%;
    padding: 10px;
    text-align: center;
    border: 1px solid var(--color-gray20);
    border-radius: 5px;
    font-size: 1rem;
`;

const Dash = styled.span`
    margin: 0 5px;
    font-size:smaller;
    color: var(--color-gray50);`;

const ProfileIconWrapper = styled.div`
    display: flex;
    flex-direction:column;
`; 

const ProfileImage = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%; 
    margin-bottom: 10px;

`;

const ProfileInputWrapper = styled.div`
    display:flex; 
    flex-direction:row; 
    border: var(--color-gray50)
`;

const CancelButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer; 
    padding: 0; 
    display: inline-block;
    align-items: center;

    &:hover {
        background: none;
        border: none;
        opacity: 1; 
    }

    &:focus {
        outline: none;
    }
`;

export default function JournalistForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordCheck: '',
        cellphone: { part1: '', part2: '', part3: '' },
        gender:'', 
        profileImg:'', 
        publisher:'명보신문' 
    });

    const [profileImg, setProfileImg] = useState(profileIcon);

    const handleSubmit = () => {
        if(validateFormState()){
            handleSignupApi(); 
        }
    };

    const handleSignupApi = async () => {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("user_name", formData.name);
        formDataToSubmit.append("user_email", formData.email);
        formDataToSubmit.append("user_pw", formData.password);
        formDataToSubmit.append("user_pw2", formData.passwordCheck);
        formDataToSubmit.append("user_cp", `${formData.cellphone.part1}-${formData.cellphone.part2}-${formData.cellphone.part3}`);
        formDataToSubmit.append("user_sex", formData.gender);
        formDataToSubmit.append("publisher", formData.publisher);
        
        if (formData.profileImg) {
            formDataToSubmit.append("user_img", formData.profileImg);
        }

        postRequest('/api/user/signup/journalist', formDataToSubmit)
        .then(response => {
            console.log('응답 상태:', response.status);  // 응답 내용 확인

            if (response.status === 200) {
                navigate('/signup/success');
            } else {
                alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
            }
        })

        .catch(error => {
            console.error("회원가입 오류:", error);
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }); 
    };

    const validateFormState = () => {
        let missingFields = [];

        if (!formData.name) missingFields.push("이름");
        if (!formData.email) missingFields.push("이메일");
        if (!formData.password) missingFields.push("비밀번호");
        if (!formData.passwordCheck) missingFields.push("비밀번호 확인");
        if (!formData.cellphone.part1 || !formData.cellphone.part2 || !formData.cellphone.part3) missingFields.push("휴대폰 번호");
        if (!formData.gender) missingFields.push("성별"); 

        if (missingFields.length > 0) {
            alert(`${missingFields[0]} 항목을 입력해주세요`);
            return false;
        }
    
        if (formData.password !== formData.passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }
    
        if (formData.cellphone.part1.length !== 3 || formData.cellphone.part2.length !== 4 || formData.cellphone.part3.length !== 4) {
            alert("휴대폰 번호 형식이 올바르지 않습니다.");
            return false;
        }

        return true; 
    }; 

    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImg(URL.createObjectURL(file)); // 프로필 이미지 상태 변경
            setFormData((prevData) => ({
                ...prevData,
                profileImg: file 
            }));
         }
    };

        const handleCellphoneChange = (part, value) => {
            setFormData(prevData => ({
                ...prevData,
                cellphone: {
                    ...prevData.cellphone,
                    [part]: value 
                }
            }));
        };
    


    const handleCancelProfile = () => {
        setProfileImg(profileIcon); 
        document.getElementById('profilePic').value = '';
    };

    const navigate = useNavigate(); 

    return (
        <div className='column mobile-container m0 pd20 aiCenter jfCcenter'>
            <TitleWrapper>
                <Title>회원정보</Title>
                <SubTitle>입력항목중<SmallText>(</SmallText><SmallRedText>*</SmallRedText><SmallText>)</SmallText>는 필수입력 표시입니다.</SubTitle>
            </TitleWrapper>

            <InputContainer>
                <InputWrapper>
                    <InputLabel>이름 <SmallRedText>*</SmallRedText></InputLabel>
                    <input 
                        type="name"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        required
                        placeholder="이름 입력"
                        className="long-input-field"
                        aria-label='이름 입력 필드'
                    ></input>
                </InputWrapper>
                <InputWrapper>
                    <InputLabel>이메일 <SmallRedText>*</SmallRedText></InputLabel>
                    <input 
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="이메일 입력"
                        className="long-input-field"
                        aria-label='이메일 입력 필드'
                    ></input>
                </InputWrapper>
                <InputWrapper>
                    <InputLabel>비밀번호 <SmallRedText>*</SmallRedText></InputLabel>
                    <input 
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                        required
                        placeholder="비밀번호 입력"
                        className="long-input-field"
                        aria-label='비밀번호 입력 필드'
                    ></input>
                    <PasswordDescription>영문,숫자,특수문자 중 2가지 이상 조합하여 8~32자 내로 입력.</PasswordDescription>
                </InputWrapper>
                <InputWrapper>
                    <InputLabel>비밀번호 확인 <SmallRedText>*</SmallRedText></InputLabel>
                    <input 
                        type="password"
                        id="passwordCheck"
                        value={formData.passwordCheck}
                        onChange={(e) => setFormData({ ...formData, passwordCheck: e.target.value })}
                        required
                        placeholder="비밀번호 검증을 위한 입력"
                        className="long-input-field"
                        aria-label='비밀번호 검증 입력 필드'
                    ></input>
                </InputWrapper>
                <InputWrapper>
                    <InputLabel>휴대전화 <SmallRedText>*</SmallRedText></InputLabel>
                    <PhoneInputWrapper>
                        <PhoneInput 
                            type="cellphone-part1"
                            id="cellphone-part1"
                            value={formData.cellphone.part1}
                            onChange={(e) => handleCellphoneChange('part1', e.target.value)}
                            required
                            placeholder="010"
                            maxLength="3"
                            aria-label='휴대전화 앞자리 입력 필드'
                        />
                        <Dash>-</Dash>
                        <PhoneInput 
                            type="cellphone-part2"
                            id="cellphone-part2"
                            value={formData.cellphone.part2}
                            onChange={(e) => handleCellphoneChange('part2', e.target.value)}
                            required
                            placeholder="1234"
                            maxLength="4"
                            aria-label='휴대전화 중간자리 입력 필드'
                        />
                        <Dash>-</Dash>
                        <PhoneInput 
                            type="cellphone-part3"
                            id="cellphone-part3"
                            value={formData.cellphone.part3}
                            onChange={(e) => handleCellphoneChange('part3', e.target.value)}
                            required
                            placeholder="5678"
                            maxLength="4"
                            aria-label='휴대전화 뒷자리 입력 필드'
                        />
                    </PhoneInputWrapper>
                </InputWrapper>
                <InputWrapper>
                    <InputLabel>성별 <SmallRedText>*</SmallRedText></InputLabel>
                    <RadioGroup>
                        <RadioLabel>
                            <input 
                                type="radio" 
                                value="M" 
                                checked={formData.gender === "M"} 
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            />  남성
                        </RadioLabel>
                        <RadioLabel>
                            <input 
                                type="radio" 
                                value="F" 
                                checked={formData.gender === "F"} 
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            />  여성
                        </RadioLabel>
                    </RadioGroup>
                </InputWrapper>
                <InputWrapper>
                    <InputLabel>프로필 사진</InputLabel>
                    <ProfileIconWrapper>
                    <ProfileImage 
                        src={profileImg}
                        alt="프로필 아이콘"
                    />
                    <ProfileInputWrapper>
                        <input 
                            type="file" 
                            id="profilePic"
                            accept="image/*" 
                            aria-label="프로필 사진 입력 필드"
                            onChange={handleProfileChange}
                        />
                        <CancelButton onClick={handleCancelProfile}>
                                 <img src ={profileResetIcon} alt='초기화 아이콘'></img>
                        </CancelButton>
                    </ProfileInputWrapper>
                    
                    </ProfileIconWrapper>
                </InputWrapper>
            </InputContainer>
    
            <NextButton onClick={handleSubmit}>등록하기</NextButton>
        </div>
    
    ); 

}