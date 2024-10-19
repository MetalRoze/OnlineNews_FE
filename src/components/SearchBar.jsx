import React, {useRef} from 'react';


export default function SearchBar() {
    const inputRef = useRef(null);

    const onSearch = () => {
        const searchText = inputRef.current.value;
        if (searchText) {
            console.log(searchText);  
        }
        inputRef.current.value = '';  
    };
    return (
        <div className='searchbar flex aiCenter pd10 br10'>
            <input
                className='searchbar-input'
                type="text"
                placeholder='검색'
                ref={inputRef}/>

            <i className="bi bi-search ml05" onClick={onSearch} />
        </div>
    );
}