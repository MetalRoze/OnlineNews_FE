import styled from "styled-components";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';


function MyDropdown() {
    const navigate = useNavigate(); 
    const isJournalist = false; //일단 백엔드 연결 전이라 일반회원 페이지 연결 되도록 했습니다

    const handleAccountClick = () => {
        if(isJournalist) {
            navigate('../myPageJournalist'); 
        }else{
            navigate('../myPageGeneral'); 
        }
    }; 

    return (
        <CustomDropdown id="dropdown-basic-button" title="메뉴" drop={'start'}>
            <Dropdown.Item onClick={handleAccountClick}>계정</Dropdown.Item>
            <Dropdown.Item href="../mobileNoti">알림</Dropdown.Item>
            <Dropdown.Item href="../log">내 활동</Dropdown.Item>
        </CustomDropdown>
    );
}

const CustomDropdown = styled(DropdownButton)`
    #dropdown-basic-button{
        
        width: fit-content;
        padding: 0;
        background-color: transparent;
        color: ${(props) => props.theme.colors.gray60};
        border: none;   
        &:hover, &:active{
            color: ${(props) => props.theme.colors.black};
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