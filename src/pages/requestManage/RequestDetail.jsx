import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BackgroundImage from '../../assets/staffDetailBackground.png';
import ArticleContent from '../articleDetail/ArticleContent';
import ProfileInfo from '../staffManage/ProfileInfo';
import { getRequest } from '../../apis/axios';
import { useParams } from 'react-router-dom';
import CommentModal from '../../components/CommentModal';
export default function RequestDetail() {

    const { id } = useParams();
    const [request, setRequest] = useState();
    const [article, setArticle] = useState();
    const [userInfo, setUserInfo] = useState();
    const [showModal, setShowModal] = useState(false);

    //request api
    const fetchRequestById = async (id) => {
        try {
            const response = await getRequest(`/api/request/${id}`);
            setRequest(response.data);
            console.log(response.data);

            if (response.data.articleId) {
                fetchArticleById(response.data.articleId);
            }
            else {
                fetchUserInfo(response.data.userId);
            }

        } catch (error) {
            console.error('요청실패', error);
        }
    };
    //article api -> 추후 dto수정
    const fetchArticleById = async (articleId) => {
        try {
            const response = await getRequest('/api/article/select', { id: articleId })
            setArticle(response.data[0]);
            console.log(response.data[0]);
        } catch (error) {
            console.error('기사 요청실패', error);
        }
    };
    const fetchUserInfo = async (userId) => {
        try {
            const response = await getRequest(`/api/user/${userId}`)
            setUserInfo(response.data);
        } catch (error) {
            console.error('사용자 요청실패', error);
        }
    };
    
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };


    useEffect(() => {
        fetchRequestById(id);
    }, [id]);

    return (
        <div className="flex" style={{ width: "100vw" }}>
            <div className="desktop-container aiCenter" style={{ padding: 0 }}>
                <StyledBackground>
                    {request && (
                        <>
                            <h1>{request.userName}</h1>
                            <p className='mb2'>{request.userEmail}</p>
                        </>
                    )}
                </StyledBackground>
                <div className='desktop-detail aiCenter boxShadow' style={{ width: 'fit-content' }}>
                    <div className='pd20 mobile-container'>
                        {article ? (
                            <ArticleContent article={article} />
                        ) : (
                            userInfo && <ProfileInfo user={userInfo}/>
                        )}
                    </div>
                    <div className="flex desktop-request-3buttons br10">
                        <button>승인</button>
                        <button onClick={handleOpenModal}>보류</button>
                        <button onClick={handleOpenModal}>거절</button>
                    </div>
                    <div style={{ height: '2rem' }} />
                </div>
                <CommentModal showModal={showModal} handleClose={handleCloseModal} />
            </div>
        </div>
    );
};

const StyledBackground = styled.div`
    width: 100%;
    height: 35vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(${BackgroundImage});
    background-size: cover;
    background-position: center;
    margin-bottom: -3.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
`;
