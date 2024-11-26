import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../apis/axios';

export const DesktopList = ({ pathTo, contents, headers, columns }) => {
    const navigate = useNavigate();

    const navigateToPath = (pathTo, id) => {
        navigate(`${pathTo}/${id}`);
    };
    const handleActionClick = (id) => {
        postHeadline(id);
    };

    const postHeadline = async (articleId) => {
        try {
            const response = await postRequest(`/api/main-article/${articleId}/select`)
            console.log(response.data.code);
            if(response.data.code ==='200'){
                 alert("헤드라인 지정되었습니다.");
            }
           
        } catch (error) {
            console.error('등록실패', error);
        }
    };
  
    return (
        <ul>
            <StyledLi>
                <ListHeader columns={columns}>
                    {headers.map((header, index) => (
                        <ListHeaderItem key={index}>{header}</ListHeaderItem>
                    ))}
                </ListHeader>
            </StyledLi>
            {contents.map((item, index) => (
                <StyledLi key={index}>
                    <ListItemWrapper columns={columns} onClick={() => navigateToPath(pathTo, item.id)}>
                        {Object.entries(item)
                            .filter(([key]) => key !== 'id' && key !== '작업')
                            .map(([key, value], i) => (
                                <ListItem key={i}>{value}</ListItem>
                            ))}
                        {item.작업 && ( //article 화면에서만, 
                            <ListItem>
                                <button
                                    className="desktop-request-privatebutton"
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        handleActionClick(item.id);
                                    }}
                                >
                                    {item.작업}
                                </button>
                            </ListItem>
                        )}
                    </ListItemWrapper>
                </StyledLi>
            ))}
        </ul>
    );
};
const StyledLi = styled.li`
    list-style: none;
`;
const ListHeader = styled.div`
  border-top: 3px solid ${(props) => props.theme.colors.black};
  display: grid;
  grid-template-columns: ${(props) => props.columns || '1fr'};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray50};
  padding: 10px;
`;
const ListHeaderItem = styled.div`
  display: block;
  align-items: center;
  text-align: center;
  font-weight: 600;
`;
const ListItemWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || '1fr'};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray10};
  padding: 10px;
`;
const ListItem = styled.div`
  display: block;
  align-items: center;
  text-align: center;
`;