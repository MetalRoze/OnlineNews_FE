import React, {useState, useEffect} from "react";
import BasicArticle from "../../components/BasicArticle";
import MenuList from "../../components/MenuList";
import styled from "styled-components";
import SubPub from "./SubPub";
import { CgAddR } from "react-icons/cg"; // 아이콘 불러오기
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function My() {
    const articles = Array(7).fill(0); // 배열 선언
    const subPubs = Array(7).fill(0); // 7개의 SubPub 컴포넌트를 생성
    const navigate = useNavigate();
    const [publishers, setPublishers] = useState([]); // API에서 가져온 데이터를 저장할 상태

    const handleSetPub = () => {
        navigate('/subManage');
    }

    useEffect(() => {
        axios.get('/api/subscription', {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldW5qdUBnbWFpbC5jb20iLCJyb2xlIjpbIlJPTEVfR0VORVJBTF9NRU1CRVIiXSwiZXhwIjoxNzMxMjI0MDkxLCJpYXQiOjE3MzEyMjA0OTF9.F-La75z9CGqMMFYw0A5nmPIOsxNw53UfOYf1NPB9sEA`
            }
        })
            .then((response) => {
                setPublishers(response.data); // 불러온 데이터를 상태에 저장
                console.log(publishers);
            })
            .catch((error) => {
                console.error("Error fetching publishers:", error);
            });
    }, []);

    return (
        <div>
            <MenuList />
            <div className="flex column mobile-container">
                <h4 style={{ textAlign: 'left', width: '95%', marginLeft: "0.5rem", marginTop: "1rem" }}>My</h4>

                <CenteredContainer>
                    <GrayBox>
                        {subPubs.map((_, index) => (
                            <SubPub key={index} publisher={`신문사 ${index + 1}`} />
                        ))}
                        <AddIconBox>
                            <CgAddR size={28}
                                onClick={handleSetPub} /> {/* 8번째 칸에 아이콘만 표시 */}
                        </AddIconBox>
                    </GrayBox>
                </CenteredContainer>

                <h4 style={{ textAlign: 'left', width: '95%', marginTop: "2rem", marginLeft: "0.5rem" }}>추천 기사</h4>

                {articles.map((_, index) => (
                    <div>
                        <BasicArticle key={index} />
                        <hr></hr>
                    </div>
                ))}
            </div>
        </div>
    );
}

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center; /* GrayBox를 부모 컨테이너에서 중앙 정렬 */
    width: 100%; /* 부모 컨테이너 전체 너비 */
`;

const GrayBox = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4개의 동일 너비의 열 */
    gap: 1.0rem; /* 그리드 항목들 간의 간격 */
    width: auto; /* 너비를 부모의 중앙 정렬에 맞춤 */
    background-color: #ccc;
    padding: 1.0rem;
    border-radius: 1rem;
    box-sizing: border-box;
    max-width: 48rem; /* 그레이 박스의 최대 너비 제한 */
`;

const AddIconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* AddIconBox는 배경이나 테두리 없이 아이콘만 표시 */
    width: 7rem; /* SubPub와 동일한 크기 */
    height: 4rem;
    cursor : pointer;
`;
