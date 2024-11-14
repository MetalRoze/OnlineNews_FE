import React, {useState} from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components'; 
import TextButton from '../../components/TextButton'; 

const MenuWrapper = styled.div
`  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 50px;
  `
;

const InputContainer = styled.div`
    width:400px;
    height:250px;
    overflow-y:auto;
    scrollbar-width: none;
    padding:0px 5px 20px 5px;
`; 

const InputWrapper = styled.div`
    max-width:400px; 
    margin-bottom:10px;
`; 

const InputLabel = styled.div`
    font-weight:500;
    font-size:1.125rem; 
    margin-bottom:10px;
`

export default function FindPassword(){
    const navigate = useNavigate(); 

    const [activeMenu, setActiveMenu] = useState("password"); 
    const [formData, setFormData] = useState({
      name: '',
      email: ''
    });

    const handleSubmit = () => {
      if(validateMissingField()){
        navigate('/findPassword/result', { state : {
          name : formData.name, 
          email: formData.email
        }});
      }
    }

    const validateMissingField = () =>{
      let missingFields = [];

      if (!formData.name) missingFields.push("이름");
      if (!formData.email) missingFields.push("이메일");

      if (missingFields.length > 0) {
        alert(`${missingFields[0]} 항목을 입력해주세요`);
        return false;
      }

      return true; 
    }

    const handleFindId = () => {
      navigate('/findId')
    }

    return (
        <div className='column mobile-container m0 pd20 aiCenter jfCcenter'>
            <MenuWrapper>
                <TextButton
                    label="이메일 찾기"
                    style={{fontSize:'2rem', fontWeight:"500"}}
                    isActive={activeMenu === "id"}
                    onClick={handleFindId}
                ></TextButton>
                <TextButton
                    label="비밀번호 찾기"
                    style={{fontSize:'2rem', fontWeight:"500"}}
                    isActive={activeMenu === "password"}
                    onClick={() => setActiveMenu('password')} 
                    ></TextButton>
            </MenuWrapper>

            <InputContainer>
              <InputWrapper>
                <InputLabel>이름</InputLabel>
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
                <InputLabel>이메일</InputLabel>
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
            </InputContainer>

            <button onClick={handleSubmit} type="submit" className="long-black-button" style={{fontWeight:"300", fontSize:"1.25rem", width:'400px'}}>비밀번호 찾기</button>
        </div>
    )
 
}