import React, { useState } from 'react';
import styled from 'styled-components';
import DesktopTab from '../../components/DesktopTab';
import MyPagination from '../../components/Pagination';
import { DesktopList } from '../../components/DesktopList';

export default function ArticleManage() {
    const [activeTab, setActiveTab] = useState('sortByCreate');

    const tabData = [
        { eventKey: 'sortByCreate', title: '등록순', content: '등록 순서 정렬' },
        { eventKey: 'sortByView', title: '조회순', content: '조회순 높은 순으로 정렬' },
        { eventKey: 'sortByLike', title: '좋아요순', content: '좋아요 높은 순으로 정렬' },
    ];

    const articles = {
        sortByCreate: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        sortByView: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        sortByLike:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    };
    
    const headers = ["입력일자", "이름", "구분", "제목", "수정일자"];
    const contents = [
        {
            입력일자: "2023-10-01",
            이름: "홍길동",
            구분: "시민",
            제목: "제목제목제목",
            수정일자: "2023-10-03"
        },
        {
            입력일자: "2023-10-01",
            이름: "김철수",
            구분: "일반",
            제목: "제목제목제목",
            수정일자: "2023-10-03"
        }
    ];
    const columns = "1fr 0.8fr 0.8fr 2fr 1fr";

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container">
                <div className='flex aiCenter spaceBetween mb1'>
                    <h2>기사</h2>
                    <div><DesktopTab tabData={tabData} setActiveTab={setActiveTab} /></div>
                </div>
                <TotalCount>전체 {articles[activeTab].length}개</TotalCount>

                <DesktopList contents={contents} headers={headers} columns={columns} />
            
                 <MyPagination itemsCountPerPage={12} totalItemsCount={articles[activeTab].length} pageRangeDisplayed={5} />
            </div>
        </div>
    );
}

const TotalCount = styled.p`
    color : ${(props) => props.theme.colors.gray50};
`;

