import React from 'react';
import { convertToEng } from '../utils/convertCategories';

const Sidebar = ({ onCategorySelect }) => {
    const categories = ['전체', '정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];

    return (
        <div className="desktop-sidebar">
            <ul className="ul">
                {categories.map((category, index) => (
                    <li key={index} onClick={() => category === '전체'? onCategorySelect(null): onCategorySelect(convertToEng(category))}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
