import React from 'react';
import styled from 'styled-components';

export default function SearchBar() {
    return (
        <div className='searchbar flex aiCenter pd10 br10'>
            <input className='searchbar-input'></input>
            <i className="bi bi-search ml05" />
        </div>
    );
}
const StyledRequestWrapper = styled.div`
  
`;
