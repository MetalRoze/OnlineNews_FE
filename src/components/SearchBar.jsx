import React, { useState } from 'react';

export default function SearchBar({ width, onSearch }) {
    const [searchText, setSearchText] = useState(''); // 상태 관리

      // 검색 함수
      const handleSearch = () => {
        if (searchText.trim()) { // 공백 입력 방지
            onSearch(searchText);
        }
    };

    // 입력값 변경 시 상태 업데이트
    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    // Enter 키로 검색
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='searchbar flex aiCenter pd10 br10' style={{ width: width }}>
            <input
                className='searchbar-input'
                type="text"
                placeholder='검색'
                value={searchText}        // 상태 연결
                onChange={handleInputChange}  // 입력 값 변경
                onKeyPress={handleKeyPress}   // Enter 키로 검색
                style={{ color: '#000' }}  // 글자색을 검정색으로 설정

            />

            <i className="bi bi-search ml05" onClick={handleSearch} />
        </div>
    );
}
