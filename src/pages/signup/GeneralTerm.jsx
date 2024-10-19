import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import termsOfService from './term/TermsOfService'
import privacyPolicy from './term/TermsOfPrivacy';
import parseTerms from './term/ParseTerms'; 

const HeadWrapper = styled.div`
    width: 600px;
    min-height: 100vh; 
    padding:0px; 
    display: flex; 
    flex-direction:column;
    justify-content: center; 
    align-items: center; 
    background-color: var(--color-white); 
`; 

const TitleWrapper = styled.div`
    width:100%; 
    max-width:400px; 
    display:flex; 
    flex-direction:column; 
    justify-content : left;
    alitn-items:left; 
`; 

const TermTitle = styled.h1`
    margin-bottom: 10px; 
    text-align: left; 
`;

const TermSubTitle = styled.p`
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

const AllAgreeWrapper = styled.div`
    width:100%; 
    max-width:400px; 
    padding: 0px 10px 0px 10px;
    display: flex; 
    flex-direction:column;
    align-items:left;
    justify-content:left; 
`; 

const AgreeCheckWrapper = styled.div`
    width:100%; 
    max-width:400px; 
    margin:5px 0px;
    display: flex; 
    flex-direction:row;
    align-items:left;
    justify-content:left; 
`; 

const UseTermAgreeWrapper = styled.div`
    width:100%; 
    max-width:400px; 
    padding: 0px 10px 10px 10px;
    margin-bottom:40px;
    display: flex; 
    flex-direction:column;
    align-items:left;
    justify-content:left; 

`; 

const CheckboxWrapper = styled.div`
    align-items:left;
`; 

const Checkbox = styled.input`
    width: 15px; 
    height: 15px; 
`; 

const CheckboxLabel = styled.h4`
    margin-left:10px; 
`; 

const AllAgreeDescription = styled.p`
    color:var(--color-gray50); 
    margin-bottom: 5px; 
`;

const HrLine = styled.hr`
  width: 100%;
  max-width: 400px;
  border: 0;
  border-bottom: 1px solid var(--color-gray50);
`;

const TermDescriptionScrollBox = styled.div`
  width: 100%;
  max-width: 400px;
  max-height: 120px;  
  padding: 10px;
  margin-bottom:20px;
  border: 1px solid var(--color-gray40);
  border-radius: 5px;
  overflow: auto; 
  color:var(--color-gray50); 
`;

export default function GeneralTerm() {
    const navigate = useNavigate(); 

    const [allChecked, setAllChecked] = useState(false); 
    const [termsChecked, setTermsChecked] = useState({
        service:false,
        privacy:false
    }); 


    const handleAllChecked = (e) => {
        const checked = e.target.checked;
        setAllChecked(checked);
        setTermsChecked({
        useTerm: checked,
        privacyTerm: checked,
        serviceTerm : checked
        });
    };


    const handleTermsChecked = (e) => {
        const { name, checked } = e.target;
        setTermsChecked((prevState) => ({
        ...prevState,
        [name]: checked,
        }));
    };

    const isFormValid = termsChecked.useTerm && termsChecked.privacyTerm;


    const handleNext = () => {
        if(isFormValid){
            navigate('/signup/signupForm');
        }
    }; 

    return (
        <HeadWrapper>
            <TitleWrapper>
                <TermTitle>이용약관</TermTitle>
                <TermSubTitle>회원가입을 통해 다양한 혜택을 누리시기 바랍니다.</TermSubTitle>
            </TitleWrapper>
            <AllAgreeWrapper>
                <AgreeCheckWrapper>
                    <CheckboxWrapper>
                        <Checkbox 
                            type= "checkbox"
                            checked={allChecked}
                            onChange={handleAllChecked}
                        ></Checkbox>
                    </CheckboxWrapper>
                    <CheckboxLabel>모두 동의합니다</CheckboxLabel>
                </AgreeCheckWrapper>
                <AllAgreeDescription>약관, 개인정보 수집 및 이용 안내, 제 3자 정보제공 및 메일링 서비스 수신 모두 동의.</AllAgreeDescription>
            </AllAgreeWrapper>

            <HrLine />

            <UseTermAgreeWrapper>
                <AgreeCheckWrapper>
                    <CheckboxWrapper>
                        <Checkbox 
                            type= "checkbox"
                            name="useTerm"
                            checked={termsChecked.useTerm}
                            onChange={handleTermsChecked}
                        ></Checkbox>
                    </CheckboxWrapper>
                    <CheckboxLabel>이용약관동의 <span style={{ fontWeight: 'normal', fontSize: 'smaller' }}>(필수)</span></CheckboxLabel>
                </AgreeCheckWrapper>
                <TermDescriptionScrollBox>
                    <small>{parseTerms(termsOfService)}</small>
                </TermDescriptionScrollBox>


                <AgreeCheckWrapper>
                    <CheckboxWrapper>
                        <Checkbox 
                            type= "checkbox"
                            name="privacyTerm"
                            checked={termsChecked.privacyTerm}
                            onChange={handleTermsChecked}
                        ></Checkbox>
                    </CheckboxWrapper>
                    <CheckboxLabel>개인정보 수집 및 이용에 대한 안내 <span style={{ fontWeight: 'normal', fontSize: 'smaller' }}>(필수)</span></CheckboxLabel>
                </AgreeCheckWrapper>
                
                <TermDescriptionScrollBox>
                    <small>{parseTerms(privacyPolicy)}</small>
                </TermDescriptionScrollBox>

                <AgreeCheckWrapper  style={{ marginTop: '15px' }}>
                    <CheckboxWrapper>
                        <Checkbox 
                            type="checkbox"
                            name="serviceTerm"
                            checked={termsChecked.serviceTerm}
                            onChange={handleTermsChecked}
                        ></Checkbox>
                    </CheckboxWrapper>
                    <CheckboxLabel>메일링 서비스 수신 동의 <span style={{ fontWeight: 'normal', fontSize: 'smaller' }}>(선택)</span></CheckboxLabel>
                </AgreeCheckWrapper>

            </UseTermAgreeWrapper>

            <NextButton onClick={handleNext}>
                동의합니다
            </NextButton>
        </HeadWrapper>
    ); 
}