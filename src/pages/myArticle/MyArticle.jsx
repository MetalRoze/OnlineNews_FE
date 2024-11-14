import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import Category from '../../components/Category';
import formatDate from '../../utils/formatDate';
import MyPagination from '../../components/Pagination';
import { getRequest } from '../../apis/axios';

function MyArticle() {
    const navigate = useNavigate();

    const [allArticles, setAllArticles] = useState([]);
    const [selectedOption, setSelectedOption] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
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
    useEffect(() => {
        fetchArticle();
    }, [selectedOption, searchText, selectedCategory]);

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
                    <option value="category">카테고리</option>
                </select>
                {selectedOption === 'category' ? (
                    <Category selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange} />
                ) : (
                    <SearchBar width={'100%'} onSearch={handleSearch} />
                )}
            </div>
            {result ? (
                <div>
                    <div>전체 {totalItemsCount}</div>
                    <ul className='myArticle mb1'>
                        {currentArticles.map((article) => (
                            <li key={article.id} onClick={() => handleClick(article.id)} className='item'>
                                <div className='flex spaceBetween mb03'>
                                    <h4 className='mr1 mtbAuto content'>{article.title}</h4>
                                    <span className='mlAuto gray40 mtbAuto wsNowrap'>{formatDate(new Date(article.createdAt))}</span>
                                </div>
                                <div className='mb05 gray60 content'>{article.subtitle.split(',./')[0]}</div>
                                <div className='content' dangerouslySetInnerHTML={{ __html: article.content }} />
                            </li>
                        ))}
                    </ul>

                    <MyPagination
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
