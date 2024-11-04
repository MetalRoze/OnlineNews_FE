import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuillEditor from './QuillEditor.jsx';
import ArticlePreview from './ArticlePreview.jsx';

const categories = ['정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];

const ArticleWrite = () => {
    const [editorContent, setEditorContent] = useState('');
    const [title, setTitle] = useState('');
    const [subTitles, setSubTitles] = useState(['']);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    const handlePreview = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const addSubtitle = () => {
        if (subTitles.length < 4) {
            setSubTitles([...subTitles, '']);
        }
    };

    // 소제목 값 변경
    const handleSubtitleChange = (index, value) => {
        const updatedSubTitles = [...subTitles];
        updatedSubTitles[index] = value;
        setSubTitles(updatedSubTitles);
    };

    return (
        <div className="mobile-container">
            <input
                type="text"
                className="mtb1"
                placeholder="제목을 입력해 주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <hr />
            <div className='mt1 flex'>
                <div className="mr1 mtbAuto">
                    소제목
                </div>
                <i className="bi bi-plus-circle" onClick={addSubtitle} style={{ cursor: 'pointer' }}></i>
            </div>
            {subTitles.map((subtitle, index) => (
                <div>
                    <input
                        key={index}
                        className="mtb1"
                        type="text"
                        placeholder={`소제목 ${index + 1}를 입력해 주세요`}
                        value={subtitle}
                        onChange={(e) => handleSubtitleChange(index, e.target.value)}
                    />
                    <hr />
                </div>
            ))}

            <div className="flex mtb1">
                <div className="mr1 mtbAuto">카테고리</div>
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
            <div className="mlAuto">
                <button onClick={handlePreview}>미리보기</button>
            </div>

            {isModalOpen && (
                <ArticlePreview
                    title={title}
                    subTitles={subTitles}
                    content={editorContent}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default ArticleWrite;
