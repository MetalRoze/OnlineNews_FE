import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuillEditor from './QuillEditor.jsx';
import ArticlePreview from './ArticlePreview.jsx';

const categories = ['정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];

const ArticleWrite = () => {
    const [originalContent, setOriginalContent] = useState('');
    const [changeImgContent, setChangeImgContent] = useState('');
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [subTitles, setSubTitles] = useState(['']);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditorChange = (content) => {
        setOriginalContent(content);
        setChangeImgContent(content);
    };

    const handleSubmit = async () => {

        // DB 저장을 위해 base64 to blob
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        const imagePromises = [];
        let match;
        while ((match = imgRegex.exec(originalContent)) !== null) {
            const imgSrc = match[1];
            if (imgSrc.startsWith('data:image/')) {
                const response = await fetch(imgSrc);
                const blob = await response.blob();
                const newImgUrl = URL.createObjectURL(blob);
                imagePromises.push(Promise.resolve(newImgUrl)); 
            }
        }
        const imageUrls = await Promise.all(imagePromises);
        // console.log('변환된 이미지 URL들:', imageUrls);
        
        const updatedHtml = changeImgContent.replace(imgRegex, (match, p1) => {
            const newUrl = imageUrls.shift();
            return match.replace(p1, newUrl);
        });
        setContent(JSON.stringify(updatedHtml))

        
        console.log('원본 HTML:', originalContent);
        console.log('이미지만 변환한 HTML:', changeImgContent);
        console.log('이스케이프 처리한 html:', content);
        console.log('이스케이프 처리 전으로 되돌린 html:', JSON.parse(content));

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

            <div className="mr1 mtbAuto">
                제목
            </div>
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
                <button onClick={handleSubmit}>미리보기</button>
            </div>

            {isModalOpen && (
                <ArticlePreview
                    title={title}
                    subTitles={subTitles}
                    content={changeImgContent}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default ArticleWrite;
