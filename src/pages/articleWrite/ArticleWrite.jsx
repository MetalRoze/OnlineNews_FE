import React, { useState } from 'react';
import QuillEditor from './QuillEditor.jsx';

const categories = ['정치', '경제', '사회', '연예', '생활/문화', '기계/IT', '오피니언'];

const ArticleWrite = () => {
    const [editorContent, setEditorContent] = useState('');
    const [previewContent, setPreviewContent] = useState(''); // 미리보기 내용을 위한 상태 추가

    const handleEditorChange = (content) => {
        setEditorContent(content); // QuillEditor에서 받은 내용을 상태로 저장
    };

    const handleSubmit = async () => {
        console.log('작성된 내용:', editorContent);
        
        // 이미지 URL 변환 로직 추가
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        const imagePromises = [];

        let match;
        while ((match = imgRegex.exec(editorContent)) !== null) {
            const imgSrc = match[1];
            if (imgSrc.startsWith('data:image/')) {
                // Base64 이미지 URL을 사용해 Blob 생성
                const response = await fetch(imgSrc);
                const blob = await response.blob();
                const newImgUrl = URL.createObjectURL(blob); // 변환된 Blob URL 생성
                imagePromises.push(Promise.resolve(newImgUrl)); // Blob URL을 더미 URL로 대체
            }
        }

        const imageUrls = await Promise.all(imagePromises);

        // 변환된 URL 출력
        console.log('변환된 이미지 URL들:', imageUrls);

        // 업데이트된 HTML 생성
        const updatedHtml = editorContent.replace(imgRegex, (match, p1) => {
            const newUrl = imageUrls.shift(); // 변환된 URL로 교체
            return match.replace(p1, newUrl);
        });

        // 업데이트된 HTML을 콘솔에 출력
        console.log('변환된 HTML:', updatedHtml);

        // 미리보기 내용 설정
        setPreviewContent(updatedHtml);

        // DB 저장 로직은 주석 처리
        // await saveArticleToDatabase(updatedHtml);
    };

    // saveArticleToDatabase 함수도 주석 처리
    // const saveArticleToDatabase = async (html) => {
    //     console.log('DB에 저장할 HTML:', html);
    // };

    return (
        <div className='mobile-container'>
            <input type='text' className='mtb1' placeholder='제목을 입력해 주세요' />
            <hr />
            <input className='mtb1' type='text' placeholder='소제목을 입력해 주세요' />
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
                <button onClick={handleSubmit}>승인 요청</button>
            </div>

            {/* <hr />
            <div className='preview-section'>
                <h3>미리보기</h3>
                <div dangerouslySetInnerHTML={{ __html: previewContent }} />
            </div>  */}
        </div>
    );
};

export default ArticleWrite;
