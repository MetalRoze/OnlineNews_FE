import React, { useState, useEffect } from 'react';
import ArticlePreview from './ArticlePreview.jsx';
import ArticleWriteForm from './ArticleWriteForm.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { getRequest, postRequest } from '../../apis/axios.jsx';

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

    const [articleData, setArticleData] = useState();

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

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };
    // 본문 관리
    const handleEditorChange = (originalContent) => {
        setOriginalContent(originalContent);
    };

    const handleContent = async () => {
        if (!title || subTitles.some(subtitle => subtitle === '') || originalContent === '' || !selectedCategory) {
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
            if (isEdit) {
                const newArticleData = {
                    category: selectedCategory,
                    title: title,
                    subtitle: mergedSubTitles,
                    content: content,
                };

                // 기존 데이터와 비교하여 차이점만 추출
                const changes = {};

                console.log('articleData', articleData);
                if (newArticleData.category !== articleData.category) changes.category = newArticleData.category;
                if (newArticleData.title !== articleData.title) changes.title = newArticleData.title;
                if (newArticleData.subtitle !== articleData.subtitle) changes.subtitle = newArticleData.subtitle;
                if (newArticleData.content !== articleData.content) changes.content = newArticleData.content;

                // 차이가 있으면 수정 API 호출
                if (Object.keys(changes).length > 0) {
                    // requestDTO
                    let requestDTO = {};
                    const formData = new FormData();
                    formData.append('requestDTO', new Blob([JSON.stringify(changes)], { type: 'application/json' }));

                    // 이미지 처리 (기존 이미지도 수정되는 경우를 고려)
                    const oldParser = new DOMParser();
                    const oldDoc = oldParser.parseFromString(articleData.content, 'text/html');
                    const oldImageElements = oldDoc.querySelectorAll('img');
                    const oldImageUrls = [];
                    oldImageElements.forEach((img) => {
                        oldImageUrls.push(img.src);
                    });

                    const newParser = new DOMParser();
                    const newDoc = newParser.parseFromString(content, 'text/html');
                    const newImageElements = newDoc.querySelectorAll('img');
                    const newImageUrls = [];
                    newImageElements.forEach((img) => {
                        newImageUrls.push(img.src);
                    });
                    // 새로운 이미지와 삭제할 이미지 구하기
                    const imagesToDelete = oldImageUrls.filter((url) => !newImageUrls.includes(url)); // 기존에 있고 새로 없는 이미지
                    const imagesToAdd = newImageUrls.filter((url) => !oldImageUrls.includes(url)); // 새로 추가된 이미지
                    // 삭제할 이미지 처리 (requestDTO에 추가)
                    if (imagesToDelete.length > 0) {
                        requestDTO.deleteImages = imagesToDelete; // 삭제할 이미지 배열을 requestDTO에 추가
                    }

                    // FormData에 수정된 데이터와 새로운 이미지 처리
                    formData.append('requestDTO', new Blob([JSON.stringify(requestDTO)], { type: 'application/json' }));

                    // 새로운 이미지 처리
                    if (imagesToAdd.length > 0) {
                        for (const imageUrl of imagesToAdd) {
                            const response = await fetch(imageUrl);
                            const blob = await response.blob();
                            const file = new File([blob], `image_${Date.now()}.png`, { type: blob.type });
                            formData.append('images', file); // 새로운 이미지 전송
                        }
                    }

                    // 디버깅용: FormData 확인
                    for (let [key, value] of formData.entries()) {
                        console.log(key, value);
                    }
                    // try {
                    //     const response = await patchRequest('/api/article/update', { id: articleId }, formData, {
                    //         'Content-Type': 'multipart/form-data',
                    //     });

                    //     if (response.status === 200) {
                    //         alert('기사가 성공적으로 수정되었습니다.');
                    //         navigate('/main');
                    //     }
                    // } catch (error) {
                    //     console.error("기사 수정 중 오류가 발생했습니다.", error);
                    //     alert('기사 수정에 실패했습니다.');
                    // }
                } else {
                    alert('수정된 내용이 없습니다.');
                }
            }
            else {
                const articleData = {
                    category: selectedCategory,
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
            }


        } else {
            handleCloseModal();
        }
    };


    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                const response = await getRequest('/api/article/select', { id: articleId });
                const articleData = response.data[0]
                setArticleData(articleData)

                if (articleData) {
                    setTitle(articleData.title);
                    setSubTitles(articleData.subtitle.split(',./'));
                    setOriginalContent(articleData.content);
                    setSelectedCategory(articleData.category);
                    setAuthorName(articleData.userID);
                }
            } catch (error) {
                console.error('기사를 불러오는 중 오류가 발생했습니다.', error);
            }
        };

        if (isEdit && articleId) {
            fetchArticleData();
        }
    }, [isEdit, articleId]);


    useEffect(() => {
        console.log("현재 선택된 카테고리:", selectedCategory);
    }, [selectedCategory]);

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
                setSelectedCategory={handleCategoryChange}
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
