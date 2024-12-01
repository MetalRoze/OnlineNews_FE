import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import { convertToKor } from '../../utils/convertCategories';
import { DesktopList } from '../../components/DesktopList';
import { getRequest } from '../../apis/axios';
import Sidebar from '../../components/Sidebar';

export default function ArticleManage() {
    const [activeTab, setActiveTab] = useState('createdAt');
    const [articles, setArticles] = useState([]); // 전체 기사 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태

    const tabData = [
        { eventKey: 'createdAt', title: '등록순', content: '등록 순서 정렬' },
        { eventKey: 'views', title: '조회순', content: '조회순 높은 순으로 정렬' },
    ];

    const fetchArticles = async (status, category) => {
        try {
            const params = {
                sortBy: status,
                sortDirection: 'desc',
                ...(category && category !== '전체' && { category }), 
            };

            const response = await getRequest('api/article/select', params);

            setArticles(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('요청 실패', error);
            setArticles([]); 
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category); 
        fetchArticles(activeTab, category); 
        setCurrentPage(1);
    };

    const headers = ['입력일자', '이름', '구분', '제목', '수정일자', '작업'];
    const columns = '1fr 0.8fr 0.8fr 2fr 1fr 0.8fr';

    const startIdx = (currentPage - 1) * 12;
    const endIdx = startIdx + 12;

    const currentArticles = Array.isArray(articles)
        ? articles.slice(startIdx, endIdx)
        : [];

    const contents = currentArticles.map((article) => ({
        입력일자: article.createdAt.split('T')[0],
        이름: article.userName,
        구분: convertToKor(article.category),
        제목: article.title,
        수정일자: article.modifiedAt
            ? article.modifiedAt.split('T')[0]
            : null,
        id: article.id,
        작업: '헤드라인',
    }));

    useEffect(() => {
        fetchArticles(activeTab, selectedCategory);
    }, [activeTab, selectedCategory]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex" style={{ width: '100vw' }}>
            <Sidebar onCategorySelect={handleCategorySelect} />
            <div className="desktop-container">
                <div className="flex aiCenter spaceBetween mt1">
                    <TotalCount>전체 {articles.length}개</TotalCount>
                    <div>
                        <DesktopTab tabData={tabData} setActiveTab={setActiveTab} />
                    </div>
                </div>

                <DesktopList
                    pathTo="../articleDetail"
                    contents={contents}
                    headers={headers}
                    columns={columns}
                />

                {articles.length !== 0 && (
                    <MyPagination
                        itemsCountPerPage={12}
                        totalItemsCount={articles.length}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}

const TotalCount = styled.p`
    color: ${(props) => props.theme.colors.gray50};
`;
