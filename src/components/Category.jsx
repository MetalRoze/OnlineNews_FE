import React, { useEffect } from 'react';
import HorizontalScroll from './HorizontalScroll';

const categories = ['정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];

const Category = ({ selectedCategory, setSelectedCategory }) => {

    const convertCategoryToEnum = (koreanCategory) => {
        switch (koreanCategory) {
            case "사회":
                return "SOCIAL";
            case "경제":
                return "ECONOMY";
            case "생활/문화":
                return "LIFE_CULTURE";
            case "연예":
                return "ENTERTAINMENT";
            case "기계/IT":
                return "SCIENCE_TECH";
            case "정치":
                return "POLITICS";
            case "오피니언":
                return "OPINION";
            default:
                throw new Error("유효하지 않은 카테고리입니다.");
        }
    };

    const handleCategoryChange = (category) => {
        const englishCategory = convertCategoryToEnum(category);
        setSelectedCategory(englishCategory);
    };

    useEffect(() => {
        if (!selectedCategory) {
            setSelectedCategory('POLITICS');
        }
    }, [selectedCategory, setSelectedCategory]);

    useEffect(() => {
        console.log("현재 선택된 카테고리:", selectedCategory);
    }, [selectedCategory]);

    return (
        <HorizontalScroll>
            {categories.map((category, index) => (
                <button
                    key={index}
                    className={` ${selectedCategory === convertCategoryToEnum(category) ? 'unsubsButton' : 'subsButton'}`}
                    onClick={() => handleCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </HorizontalScroll>

    );
};
export default Category;

