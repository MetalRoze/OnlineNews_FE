import React, { useState, useEffect, useRef } from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";
import BasicArticle from "../../components/BasicArticle";
import styled from "styled-components";
import { getRequest } from '../../apis/axios';

export default function Main() {
    const [head, setHead] = useState(null);
    const [articles, setArticles] = useState([]);  // 기본값을 빈 배열로 설정
    const [adError, setAdError] = useState(false);  // 광고 로드 오류 상태
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 헤드라인 데이터 먼저 가져오기
                const headlineResponse = await getRequest("/api/main-article/headline");

                if (headlineResponse && headlineResponse.data && headlineResponse.data.length > 0) {
                    setHead(headlineResponse.data[0]);
                } else {
                    console.error("No headline data found.");
                }

                // 그 후 기사 데이터 가져오기
                const articleResponse = await getRequest("/api/main-article");
                setArticles(articleResponse.data);  // 가져온 데이터를 articles 상태에 저장
                console.log(articleResponse.data);

            } catch (error) {
                console.error("Failed to fetch articles:", error);
                setArticles([]);  // 오류가 발생한 경우에도 빈 배열로 설정
            }
        };

        fetchData();

        // 광고 스크립트 로드
        const script = document.createElement("script");
        const ins = document.createElement("ins");

        ins.className = 'kakao_ad_area';
        ins.setAttribute('style', 'display: none;');
        script.async = true;
        script.type = 'text/javascript';
        script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
        ins.setAttribute('data-ad-unit', 'DAN-zuzxRmoWnjvO6oLm');
        ins.setAttribute('data-ad-width', '300');
        ins.setAttribute('data-ad-height', '250');

        script.onload = () => {
            console.log("광고 스크립트 로드 성공");
            setAdError(false);
        };

        script.onerror = () => {
            console.error("광고 스크립트 로드 실패");
            setAdError(true);
        };

        let parent = document.getElementById('adFit');
        parent?.appendChild(ins);
        parent?.appendChild(script);

    }, []);

    return (
        <div className='flex column mobile-container m0 pd0'>
            <MenuList />
            <div>광고수정7</div>
            <div id="adFit">
                {adError && <p>광고 로드 실패</p>}
            </div>

            {head ? <HeadlineArticle head={head} /> : <p>Loading headline...</p>}
            {
                Array.isArray(articles) && articles.length > 0 ? (
                    articles.map((article) => (
                        <div key={article.id}>
                            <BasicArticle article={article} />
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No articles available or loading...</p>
                )
            }
        </div >
    );
}

const Divider = styled.div`
    width: 100%;                 
    height: 2px;                 
    background-color: #ccc;      
    margin: 10px 0;              
`;
