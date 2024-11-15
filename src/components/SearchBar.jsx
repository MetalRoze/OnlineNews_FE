import React, {useRef} from 'react';


export default function SearchBar({width, onSearch}) {
    const inputRef = useRef(null);

    const handleSearch = () => {
        const searchText = inputRef.current.value;
        if (searchText) {
            console.log(searchText);
            onSearch(searchText)  
        }
    };
    return (
        <div className='searchbar flex aiCenter pd10 br10' style={{width: width}}>
            <input
                className='searchbar-input'
                type="text"
                placeholder='검색'
                ref={inputRef}/>

            <i className="bi bi-search ml05" onClick={handleSearch} />
        </div>
    );
}
