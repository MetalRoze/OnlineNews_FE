import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import Category from '../../components/Category';
import formatDate from '../../utils/formDateTime';
import MyPagination from '../../components/Pagination';
import { getRequest } from '../../apis/axios';

function MyArticle() {
    const navigate = useNavigate();

    const [allArticles, setAllArticles] = useState([]);
    const [selectedOption, setSelectedOption] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isPublic, setIsPublic] = useState('');
    const [status, setStatus] = useState('');
    const [result, setResult] = useState();

    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // 기사 리스트 조회
    const fetchArticle = async () => {
        const authToken = sessionStorage.getItem('authToken');
        if (!authToken) {
            alert('로그인 정보가 없습니다.');
            return;
        }

        try {
            const userResponse = await getRequest('/api/user/myPage');
            const userId = userResponse.data.id;
            const filters = { // 기본 조회
                userId, sortBy: "createdAt", sortDirection: "desc",
            }
            if (selectedOption === 'title' && searchText) { // 제목 검색
                filters.title = searchText;
            } else if (selectedOption === 'content' && searchText) { // 내용 검색
                filters.content = searchText;
            } else if (selectedOption === 'category' && selectedCategory) { // 카테고리 검색
                filters.category = selectedCategory;
            }

            if (isPublic) { // 공개 여부
                if (isPublic === "true")
                    filters.isPublic = true;
                else
                    filters.isPublic = false;
            }

            if (status) { // 상태
                filters.state = status;
            }
            const articleResponse = await getRequest('/api/article/select', filters);

            // 검색 결과 처리
            if (Array.isArray(articleResponse.data) && articleResponse.data.length > 0) {
                const updatedArticles = articleResponse.data.map(article => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(article.content, 'text/html');
                    const firstParagraph = Array.from(doc.querySelectorAll('p'))
                        .find(p => !p.querySelector('img'))?.outerHTML || '';

                    return {
                        ...article,
                        content: firstParagraph,
                    };
                });

                setResult(true)
                setAllArticles(updatedArticles);
                setTotalItemsCount(updatedArticles.length);
            }
            // 검색 결과 없음
            else { setResult(false) }

        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    // 페이지 이동
    const handleClick = (id) => {
        navigate(`/myDetail/${id}`);
    };

    // 페이지네이션
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const startIdx = (currentPage - 1) * itemsCountPerPage;
    const endIdx = startIdx + itemsCountPerPage;
    const currentArticles = allArticles.slice(startIdx, endIdx);

    // 기사 검색
    const handleSearch = (searchText) => { // 제목 / 내용
        setSearchText(searchText);
    };
    const handleCategoryChange = (category) => { // 카테고리
        setSelectedCategory(category);
    };
    const handlePublic = (value) => { // 공개여부
        setIsPublic(value);
    };
    const handleStatus = (value) => { // 상태
        setStatus(value);
    };

    const handleReset = () => {
        setSearchText('');
        setSelectedCategory('')
        setSelectedOption('')
        setIsPublic('');
        setStatus('')
    };

    useEffect(() => {
        fetchArticle();
    }, [selectedOption, searchText, selectedCategory, isPublic, status]);
    useEffect(() => {
        setSearchText('');
        setSelectedCategory('');
    }, [selectedOption])

    return (
        <div className='mobile-container'>
            <div className='flex space mb1' style={{ width: '100%' }}>
                <select className='mr1' onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
                    <option value="all">전체</option>
                    <option value="title">제목</option>
                    <option value="content">내용</option>
                    <option value="category">카테고리</option>
                </select>
                {selectedOption === 'category' ? (
                    <Category selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange} />
                ) : (
                    <SearchBar width={'100%'} onSearch={handleSearch} />
                )}
            </div>
            <div className="flex mb1">
                <div className='flex spaceBetween flex1'>
                    <div className="">
                        <div>
                            <input
                                type="radio"
                                id="public"
                                name="visibility"
                                value="true"
                                checked={isPublic === "true"}
                                onChange={() => handlePublic("true")}
                            />
                            <label htmlFor="public">공개</label>

                            <input
                                type="radio"
                                id="private"
                                name="visibility"
                                value="false"
                                checked={isPublic === "false"}
                                onChange={() => handlePublic("false")}
                            />
                            <label htmlFor="private">비공개</label>
                        </div>
                    </div>

                    <div>
                        <div>
                            <input
                                type="radio"
                                id="pending"
                                name="status"
                                value="PENDING"
                                checked={status === "PENDING"}
                                onChange={() => handleStatus("PENDING")}
                            />
                            <label htmlFor="pending">승인대기</label>

                            <input
                                type="radio"
                                id="approved"
                                name="status"
                                value="APPROVED"
                                checked={status === "APPROVED"}
                                onChange={() => handleStatus("APPROVED")}
                            />
                            <label htmlFor="approved">승인됨</label>

                            <input
                                type="radio"
                                id="holding"
                                name="status"
                                value="HOLDING"
                                checked={status === "HOLDING"}
                                onChange={() => handleStatus("HOLDING")}
                            />
                            <label htmlFor="holding">보류됨</label>

                            <input
                                type="radio"
                                id="rejected"
                                name="status"
                                value="REJECTED"
                                checked={status === "REJECTED"}
                                onChange={() => handleStatus("REJECTED")}
                            />
                            <label htmlFor="rejected">거절됨</label>
                        </div>
                    </div>
                </div>
                <div className='ml1 hoverGray' onClick={handleReset}> 초기화 </div>

            </div>

            {result ? (
                <div>
                    <div className='mtbAuto'>전체 {totalItemsCount}</div>
                    <ul className='myArticle mb1'>
                        {currentArticles.map((article) => (
                            <div>
                                <div className='item flex spaceBetween' onClick={() => handleClick(article.id)}>
                                    {article.images[0] && (
                                        <img src={article.images[0]} className='Aimage'></img>
                                    )}
                                    <div className='flex column' style={{ width: article.images[0] ? '77%' : '100%' }}>
                                        <h5 className='mb03 content'>{article.title}</h5>
                                        <div className='mb1 gray60 content'>{article.subtitle.split(',./')[0]}</div>
                                        <small className='gray40 block taRight mtAuto'>{formatDate(new Date(article.createdAt))}</small>
                                    </div>
                                </div>
                                <hr></hr>
                            </div>
                        ))}
                    </ul>

                    <MyPagination
                        activePage={currentPage}
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                    />
                </div>
            ) : (
                <div>해당 기사가 존재하지 않습니다.</div>
            )}

        </div>
    );
}

export default MyArticle;
