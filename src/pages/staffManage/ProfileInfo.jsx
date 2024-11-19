import React from 'react';
import styled from 'styled-components';
import {convertUserGradeToKor} from '../../utils/convertUserGrade';

export default function ProfileInfo(user) {
    return (
        <StyledProfileWrapper>
            <img src={user.user.img || "https://placehold.co/150x200"} alt="Bootstrap" />
            <ProfileInfoTable>
                <tbody>
                    <tr>
                        <td>이름</td>
                        <td>{user.user.name}</td>
                    </tr>
                    <tr>
                        <td>소개</td>
                        <td>{user.bio}</td>
                    </tr>
                    <tr>
                        <td>구분</td>
                        <td>{convertUserGradeToKor(user.user.grade)}</td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td>{user.user.cp}</td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>{user.user.email}</td>
                    </tr>
                </tbody>
            </ProfileInfoTable>
        </StyledProfileWrapper>
    );
}

const StyledProfileWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    background-color: ${(props) => props.theme.colors.white};
`;

const ProfileInfoTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    td {
        padding: 0.5rem;
        border-bottom: 1px solid ${(props) => props.theme.colors.gray20};
    }

    td:first-child {
        width: 5rem; 
        color: ${(props) => props.theme.colors.gray60};
    }
`;
