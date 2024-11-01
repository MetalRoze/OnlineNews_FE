import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuillEditor from './QuillEditor.jsx';
import ArticlePreview from './ArticlePreview.jsx'; // ArticlePreview를 임포트

const categories = ['정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];

const ArticleWrite = () => {
    const [editorContent, setEditorContent] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    const handlePreview = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    return (
        <div className='mobile-container'>
            <input
                type='text'
                className='mtb1'
                placeholder='제목을 입력해 주세요'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <hr />
            <input
                className='mtb1'
                type='text'
                placeholder='소제목을 입력해 주세요'
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
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

            {/* ArticlePreview를 모달로 표시 */}
            {isModalOpen && (
                <ArticlePreview
                    title={title}
                    subtitle={subtitle}
                    content={editorContent}
                    onClose={handleCloseModal} // 모달 닫기 함수 전달
                />
            )}
        </div>
    );
};

export default ArticleWrite;
