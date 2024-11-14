import React, { useState, useEffect } from 'react';
import ArticlePreview from './ArticlePreview.jsx';
import ArticleWriteForm from './ArticleWriteForm.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { postRequest } from '../../apis/axios.jsx';

const ArticleWrite = () => {

    const navigate = useNavigate();
    const { articleId } = useParams();

    const [isEdit, setIsEdit] = useState(!!articleId);
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

    // 카테고리 관리
    const convertCategoryToEnum = (koreanCategory) => {
        switch (koreanCategory) {
            case "사회":
                return "SOCIAL";
            case "경제":
                return "ECONOMY";
            case "생활/문화":
                return "LIFE_CULTURE";
            case "연예":
                return "ENTERTAINMENT";
            case "기계/IT":
                return "SCIENCE_TECH";
            case "정치":
                return "POLITICS";
            case "오피니언":
                return "OPINION";
            default:
                throw new Error("유효하지 않은 카테고리입니다.");
        }
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
            } else {
                imagePromises.push(Promise.resolve(imgSrc));
            }
        }
        const imageUrl = await Promise.all(imagePromises);
        console.log('변환된 이미지 URL들:', imageUrl);

        const updatedHtml = originalContent.replace(imgRegex, () => {
            return `<img src="${imageUrl.shift()}"`;
        });

        setContent(updatedHtml)
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

    // 기사 제출
    const handleSubmit = async () => {
        const isConfirmed = window.confirm('기사를 제출하시겠습니까?');

        if (isConfirmed) {
            const mergedSubTitles = subTitles.join(',./');
            const categoryEnum = convertCategoryToEnum(selectedCategory);

            const articleData = {
                category: categoryEnum,
                title: title,
                subtitle: mergedSubTitles,
                content: content,
            };

            // requestDTO
            const formData = new FormData();
            formData.append('requestDTO', new Blob([JSON.stringify(articleData)], { type: 'application/json' }));

            // images
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const imageElements = doc.querySelectorAll('img');
            const imageUrls = [];
            imageElements.forEach((img) => {
                imageUrls.push(img.src);
            });

            if (imageUrls.length > 0) {
                for (const imageUrl of imageUrls) {
                    const response = await fetch(imageUrl);
                    const blob = await response.blob();
                    const file = new File([blob], `image_${Date.now()}.png`, { type: blob.type });
                    formData.append('images', file);
                }
            }

            // post
            try {
                const response = await postRequest('/api/article/write', formData, {
                    'Content-Type': 'multipart/form-data',
                });

                if (response.status === 200) {
                    alert('기사가 성공적으로 제출되었습니다.');
                    navigate('/main');
                }
            } catch (error) {
                console.error("기사 제출 중 오류가 발생했습니다.", error);
                alert('기사 제출에 실패했습니다.');
            }

        } else {
            handleCloseModal();
        }
    };

    // 수정 모드일 때
    useEffect(() => {
        console.log('isEdit 상태:', isEdit, 'articleId:', articleId);
        if (isEdit) {
            const fetchArticleData = async () => {
                const article = {
                    title: "임시 제목",
                    subtitle: "소제목1,./소제목2,./소제목3",
                    content: "<p>d<img src=\"https://onlinen-news-bucket.s3.amazonaws.com/articleImg/331234c1-9420-4207-9fff-c7a4c71bde87.jpeg\" height=\"500\" width=\"375\"></p>",
                    category: "사회",
                    authorName: "홍길동"
                };
        
                try {
                    setTitle(article.title);
                    setSubTitles(article.subtitle.split(',./'));
                    setOriginalContent(article.content);
                    setSelectedCategory(article.category);
                    setAuthorName(article.authorName);
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
                content={originalContent}
            ></ArticleWriteForm>

            {isModalOpen && (
                <ArticlePreview
                    authorName={authorName}
                    title={title}
                    category={selectedCategory}
                    articleDate={articleDate}
                    subTitles={subTitles}
                    content={JSON.stringify(content)}
                    onClose={handleCloseModal}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default ArticleWrite;
