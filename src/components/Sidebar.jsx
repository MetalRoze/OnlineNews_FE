import React from 'react';

const Sidebar = () => {
    const categories = [ '정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];
    const paths = ['main', 'my', 'ranking', 'politics', 'economy', 'society', 'entertainment', 'lifestyle', 'tech', 'opinion'];

    return (
        <div className="desktop-sidebar">
            <ul className='ul'>
                    {categories.map((category, index) => (
                        <li key={index}>
                            {category}
                        </li>
                    ))}
                </ul>
        </div>
    );
};

export default Sidebar;
