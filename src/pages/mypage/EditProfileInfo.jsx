import React, { useState } from "react";
import styled from "styled-components";
import { convertUserGradeToKor } from "../../utils/convertUserGrade";
import editIcon from '../../assets/editIcon.png';

export default function EditProfileInfo({ user }) {
    const [editField, setEditField] = useState(null);
    const [tempUser, setTempUser] = useState({ ...user });

    const handleEditToggle = (field) => {
        if (editField === field) {
            setEditField(null);
        } else {
            setEditField(field);
        }
    };

    const handleChange = (field, value) => {
        setTempUser((prev) => ({
            ...prev,
            [field]: value,
        }));
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

    const handleSave = (field) => {
        console.log(`Saving ${field}:`, tempUser[field]);
        setEditField(null);
    };


    return (
        <StyledProfileWrapper>
            <img
                src={tempUser.img || "https://placehold.co/150x200"}
                alt="Profile"
                onClick={triggerFileInput} 
                style={{ width: "150px", height: "200px", objectFit: "cover" }}
            />
            <input 
                type="file" 
                id="profileImageInput" 
                style={{ display: 'none' }} 
                accept="image/*" 
                onChange={handleImageUpload}
            />
            <ProfileInfoTable>
                <tbody>
                    {renderRow("이름", tempUser.name, "name", editField, handleEditToggle, handleChange, handleSave)}
                    {renderRow("소개", tempUser.bio, "bio", editField, handleEditToggle, handleChange, handleSave)}
                    {renderRow(
                        "구분",
                        convertUserGradeToKor(tempUser.grade),
                        "grade",
                        editField,
                        handleEditToggle,
                        handleChange,
                        handleSave
                    )}
                    {renderRow("전화번호", tempUser.phoneNumber, "phoneNumber", editField, handleEditToggle, handleChange, handleSave)}
                    {renderRow("이메일", tempUser.email, "email", editField, handleEditToggle, handleChange, handleSave)}
                </tbody>
            </ProfileInfoTable>
        </StyledProfileWrapper>
    );
}

function renderRow(label, value, field, editField, onEditToggle, onChange, onSave) {
    const isEditing = editField === field;
    return (
        <tr key={field}>
            <td>{label}</td>
            <td>
                {isEditing ? (
                    <InputWrapper>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(field, e.target.value)}
                            style={{ width: '90%', height: 'fit-content', padding: 0 }}

                        />
                        <button className='desktop-request-privatebutton' onClick={() => onSave(field)}>저장</button>
                    </InputWrapper>
                ) : (
                    <TdWrapper>
                        <div style={{minWidth: '90%'}}>
                            {value}
                        </div>
                        <img className='pointer' src={editIcon} onClick={() => onEditToggle(field)} style={{ width: '15px' }} />
                    </TdWrapper>

                )}
            </td>
        </tr>
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

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TdWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
