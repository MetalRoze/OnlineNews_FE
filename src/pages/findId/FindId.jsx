import React, {useState} from 'react'; 
import { useNavigate } from 'react-router-dom';
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
    height: 250px;
    max-height:600px;
    overflow-y:auto;
    scrollbar-width: none;
    padding:0px 5px 20px 5px;
`; 

const InputWrapper = styled.div`
    width:100%; 
    max-width:400px; 
    margin-bottom:10px;
`; 

const InputLabel = styled.div`
    font-weight:500;
    font-size:1.125rem; 
    margin-bottom:10px;
`
const PhoneInputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin-bottom:10px;
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


export default function FindId(){
    const navigate = useNavigate(); 

    const [activeMenu, setActiveMenu] = useState("id"); 
    const [formData, setFormData] = useState({
      name: '',
      cellphone: { part1: '', part2: '', part3: '' }
    });

    const handleSubmit = () => {
      let missingFields = [];

      if (!formData.name) missingFields.push("이름");
      if (!formData.cellphone.part1 || !formData.cellphone.part2 || !formData.cellphone.part3) missingFields.push("휴대폰 번호");

      if (missingFields.length > 0) {
        alert(`${missingFields[0]} 항목을 입력해주세요`);
        return;
      }

      navigate('/findId/result'); 
    }

    const handleFindPassword = () => {
      navigate('/findPassword')
    }

    return (
        <div className='column mobile-container m0 pd20 aiCenter jfCcenter'>
            <MenuWrapper>
                <TextButton
                    label="이메일 찾기"
                    style={{fontSize:'2rem', fontWeight:"500"}}
                    isActive={activeMenu === "id"}
                    onClick={() => setActiveMenu("id")}
                ></TextButton>
                <TextButton
                    label="비밀번호 찾기"
                    style={{fontSize:'2rem', fontWeight:"500"}}
                    isActive={activeMenu === "password"}
                    onClick={handleFindPassword}
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
                <InputLabel>휴대전화</InputLabel>
                <PhoneInputWrapper>
                  <PhoneInput 
                    type="tecellphone-part1"
                    id="cellphone-part1"
                    value={formData.cellphone.part1}
                    onChange={(e) => setFormData({ ...formData, cellphone: { ...formData.cellphone, part1: e.target.value } })}
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
                    onChange={(e) => setFormData({ ...formData, cellphone: { ...formData.cellphone, part2: e.target.value } })}
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
                    onChange={(e) => setFormData({ ...formData, cellphone: { ...formData.cellphone, part3: e.target.value } })} 
                    required
                    placeholder="5678"
                    maxLength="4"
                    aria-label='휴대전화 뒷자리 입력 필드'
                />
                </PhoneInputWrapper>
              </InputWrapper>
            </InputContainer>

            <button onClick={handleSubmit} type="submit" className="long-black-button" style={{fontWeight:"300", fontSize:"1.25rem", width:'400px'}}>이메일 찾기</button>


        </div>
    )
 
}