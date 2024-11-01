import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuillEditor from './QuillEditor.jsx';

const categories = ['정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];

const ArticleWrite = () => {
    const [editorContent, setEditorContent] = useState('');
    const [title, setTitle] = useState(''); // 제목 상태 추가
    const [subtitle, setSubtitle] = useState(''); // 소제목 상태 추가

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    const navigate = useNavigate();

    const handlePreview = () => {
        navigate('/ArticlePreview', { state: { title, subtitle, content: editorContent } });
    };

    return (
        <div className='mobile-container'>
            <input
                type='text'
                className='mtb1'
                placeholder='제목을 입력해 주세요'
                value={title}
                onChange={(e) => setTitle(e.target.value)} // 제목 입력 처리
            />
            <hr />
            <input
                className='mtb1'
                type='text'
                placeholder='소제목을 입력해 주세요'
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)} // 소제목 입력 처리
            />
            <hr />
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
            <hr />
            <QuillEditor onChange={handleEditorChange} />
            <div className='mlAuto'>
                <button onClick={handlePreview}>미리보기</button>
            </div>
        </div>
    );
};

export default ArticleWrite;
