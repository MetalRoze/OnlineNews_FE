import React, { useEffect } from 'react';
import HorizontalScroll from './HorizontalScroll';
import { convertToEng, convertToKor } from '../utils/convertCategories'
const categories = ['정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];

const Category = ({ selectedCategory, setSelectedCategory }) => {

    const handleCategoryChange = (category) => {
        const englishCategory = convertToEng(category);
        setSelectedCategory(englishCategory);
    };

    return (
        <HorizontalScroll>
            {categories.map((category, index) => (
                <button
                    key={index}
                    className={` ${selectedCategory === convertToEng(category) ? 'unsubsButton' : 'subsButton'}`}
                    onClick={() => handleCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </HorizontalScroll>

    );
};
export default Category;

