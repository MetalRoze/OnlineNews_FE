import React, {useState} from 'react';
import { convertToEng } from '../utils/convertCategories';

const Sidebar = ({ onCategorySelect }) => {
    const categories = ['전체', '정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];
    const [activeCategory, setActiveCategory] = useState('전체'); 

    const handleCategoryClick = (category) => {
        setActiveCategory(category); 
        onCategorySelect(category === '전체' ? null : convertToEng(category));
    };
    return (
        <div className="desktop-sidebar">
            <ul className="ul">
                {categories.map((category, index) => (
                    <li
                    key={index}
                    className={activeCategory === category ? 'active' : ''} 
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
