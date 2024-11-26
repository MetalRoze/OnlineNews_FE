import styled from "styled-components";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function MyDropdown() {
    const navigate = useNavigate();
    const [isJournalist, setIsJournalist] = useState(false);  // 회원 유형을 상태로 관리
    const [isEditor, setIsEditor] = useState(false);  

    const checkUserType = async () => {
        const accessToken = sessionStorage.getItem('authToken');  // sessionStorage에서 토큰을 가져옴
        if (!accessToken) {
            console.error('No access token found');
            return;  // 토큰이 없으면 API 호출을 하지 않음
        }
        try {
            const response = await axios.get('/api/user/checkUserType', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`  // 가져온 토큰을 사용
                }
            });
    
            const userType = response.data;
    
            if (userType === 'GENERAL_MEMBER') {
                setIsJournalist(false);
            } else if(userType === 'REPORTER' || userType === 'INTERN_REPORTER' || userType === 'CITIZEN_REPORTER') {
                setIsJournalist(true);
            }
            else {
                setIsJournalist(true);
                setIsEditor(true);
            }
        } catch (error) {
            console.error("회원 유형 확인 실패", error);
        }
    };

    // 컴포넌트가 마운트 될 때 API 호출
    useEffect(() => {
        checkUserType();
    }, []);
    

    const handleAccountClick = () => {
        if (isJournalist) {
            navigate('../myPageJournalist');
        } else {
            navigate('../myPageGeneral');
        }
    };

    return (
        <CustomDropdown id="dropdown-basic-button" title="메뉴" drop={'start'}>
            <Dropdown.Item onClick={handleAccountClick}>계정</Dropdown.Item>
            {!isEditor && <Dropdown.Item href="../mobileNoti">알림</Dropdown.Item>}
            <Dropdown.Item href="../log">내 활동</Dropdown.Item>
            {/* 기자일 때만 보여지는 메뉴 */}
            {isJournalist  &&(
                <>
                    <Dropdown.Item href="../articleWrite">기사 작성</Dropdown.Item>
                    <Dropdown.Item href="../myArticle">작성한 기사</Dropdown.Item>
                </>
            )}
        </CustomDropdown>
    );
}

const CustomDropdown = styled(DropdownButton)`
    #dropdown-basic-button{
        
        width: fit-content;
        padding: 0;
        background-color: transparent;
        color: ${(props) => props.theme.colors.black};
        border: none;   
        &:hover, &:active{
            color: ${(props) => props.theme.colors.blue};
        }
    }
    .dropdown-toggle::before {
        display: none;
    }
    .dropdown-menu{
        border: none;
        background-color: ${(props) => props.theme.colors.gray10};
        box-shadow: 0.15rem 0 0.5rem rgba(0, 0, 0, 0.25);
    }
    .dropdown-item{
        color: ${(props) => props.theme.colors.gray60};
        background-color: transparent;
        &:hover{
            background-color: ${(props) => props.theme.colors.white};
            color: ${(props) => props.theme.colors.black};
        }
    }
`;
export default MyDropdown;