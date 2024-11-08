import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export const DesktopList = ({ pathTo, contents, headers, columns }) => {
    const navigate= useNavigate();

    const navigateToPath = (pathTo) => {
        navigate(`${pathTo}`);
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
                    <ListItemWrapper columns={columns}>
                        {Object.values(item).map((item, i) => (
                            <ListItem className="cursor" key={i} onClick={()=>navigateToPath(pathTo)}>{item}</ListItem>
                        ))}
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