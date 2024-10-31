import React, { useState, useEffect } from 'react';
import QuillEditor from './QuillEditor.jsx';

const categories = ['랭킹', '정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];

const ArticleWrite = () => {
    return (
        <div className='mobile-container'>
            <input type='text' className='mtb1' placeholder='제목을 입력해 주세요'></input>
            <hr></hr>
            <input className='mtb1' type='text' placeholder='소제목을 입력해 주세요'></input>
            <hr></hr>
            <div className='flex mtb1'>
                <div className='mr1 mtbAuto'>카테고리</div>
                <select>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <hr></hr>
            <QuillEditor></QuillEditor>
            <div className='mlAuto'>
                <button>승인 요청</button>
            </div>
        </div >
    );
};

export default ArticleWrite;
