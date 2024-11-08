import React, { useState, useEffect } from 'react';
import ArticlePreview from './ArticlePreview.jsx';
import ArticleWriteForm from './ArticleWriteForm.jsx';
import { useNavigate, useParams } from 'react-router-dom';


const ArticleWrite = () => {

    const navigate = useNavigate();

    const { articleId } = useParams(); // URL 파라미터에서 articleId를 가져옵니다.
    const [isEdit, setIsEdit] = useState(!!articleId); // articleId가 있으면 수정 모드로 설정합니다.
    
    const [originalContent, setOriginalContent] = useState('');
    const [content, setContent] = useState('');
    const [authorName, setAuthorName] = useState('홍길동');
    const [articleDate, setArticleDate] = useState("");
    const [title, setTitle] = useState('');
    const [subTitles, setSubTitles] = useState(['']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    // 소제목 관리
    const addSubtitleForm = () => {
        if (subTitles.length < 4) {
            setSubTitles([...subTitles, '']);
        }
    };
    const minusSubtitleForm = (index) => {
        if (subTitles.length > 1) {
            const updatedSubTitles = subTitles.filter((_, i) => i !== index);
            setSubTitles(updatedSubTitles);
        }

        if (subTitles.length == 1) {
            alert('소제목은 필수 항목입니다.');
        }
    };
    const handleSubtitleChange = (index, value) => {
        const updatedSubTitles = [...subTitles];
        updatedSubTitles[index] = value;
        setSubTitles(updatedSubTitles);
    };

    // 본문 관리
    const handleEditorChange = (originalContent) => {
        setOriginalContent(originalContent);
    };

    const handleContent = async () => {
        if (!title || subTitles.some(subtitle => subtitle === '') || originalContent === '') {
            alert("모든 필드를 작성해 주세요.");
            return;
        }

        const now = new Date();
        const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${now.getHours() > 12 ? '오후' : '오전'} ${String(now.getHours() % 12 || 12).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setArticleDate(formattedDate);

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

        const updatedHtml = originalContent.replace(imgRegex, (match, p1) => {
            const newUrl = imageUrls.shift();
            return match.replace(p1, newUrl);
        });
        setContent(JSON.stringify(updatedHtml))

        console.log('원본 HTML:', originalContent);

        setIsModalOpen(true);
    };

    useEffect(() => {
        if (content) {

            console.log('이스케이프 처리한 html:', content);
            try {
                console.log('이스케이프 처리 전으로 되돌린 html:', JSON.parse(content));
            } catch (error) {
                console.log('파싱 필요없음');
            }
        }
    }, [content]);

    // 모달 관리
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = () => {
        const isConfirmed = window.confirm('기사를 제출하시겠습니까?');

        if (isConfirmed) {

            // 여기에서 api 연결
            const mergedSubTitles = subTitles.join(',./');
            navigate('/main');
        }
        else
            handleCloseModal();
    };
    useEffect(() => {
        console.log('isEdit 상태:', isEdit, 'articleId:', articleId);
        if (isEdit) {
            const fetchArticleData = async () => {
                const article = {
                    title: "임시 제목",
                    subtitle: "소제목1,./소제목2,./소제목3",
                    content: "<p>임시 본문 내용입니다.</p>",
                    category: "사회"
                };
        
                try {
                    setTitle(article.title);
                    setSubTitles(article.subtitle.split(',./'));
                    setContent(article.content);
                    setSelectedCategory(article.category);
                } catch (error) {
                    console.error("기사를 불러오는 중 오류가 발생했습니다.", error);
                }
            };
            fetchArticleData();
        }
    }, [isEdit, articleId]);

    
    return (
        <div className="mobile-container">
            <ArticleWriteForm
                title={title}
                setTitle={setTitle}
                subTitles={subTitles}
                setSubTitles={setSubTitles}
                handleSubtitleChange={handleSubtitleChange}
                addSubtitleForm={addSubtitleForm}
                minusSubtitleForm={minusSubtitleForm}
                handleContent={handleContent}
                setOriginalContent={setOriginalContent}
                handleEditorChange={handleEditorChange}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                content={content}
            ></ArticleWriteForm>

            {isModalOpen && (
                <ArticlePreview
                    authorName={authorName}
                    title={title}
                    category={selectedCategory}
                    articleDate={articleDate}
                    subTitles={subTitles}
                    content={content}
                    onClose={handleCloseModal}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default ArticleWrite;
