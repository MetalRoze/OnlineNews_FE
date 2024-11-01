import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center; 
    align-items: center; 
`;

const ModalContent = styled.div`
    background: white;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    max-width: 580px; 
    margin-left:15px;
    height:80vh;
    display:flex;
    flex-direction:column;
`;

const ArticlePreview = ({ title, subtitle, content, onClose }) => {
    const [articleDate, setArticleDate] = useState("입력 yyyy.mm.dd 오전 hh:mm");
    const [authorName, setAuthorName] = useState("홍길동");

    const handleSubmit = () => {
        const isConfirmed = window.confirm('기사를 제출하시겠습니까?');

        if (isConfirmed) {
            navigate('/main');
        }
    };
    return (
        <ModalOverlay>
            <ModalContent>
                <div className='mlAuto' onClick={onClose}>x</div>
                <div>
                    <h1 className='mt1'>{title}</h1>
                    <h3 className='mt1'>{subtitle}</h3>
                    <small className='mt1 gray40'>{articleDate}</small>
                    <div className='mt1 taRight'>
                        <p className='mr1 inline'>{authorName} 기자</p>
                        <img className='br50' src="https://placehold.co/50x50" alt="Author" />
                    </div>
                </div>
                <hr style={{ margin: '1rem 0' }} />
                <div className='pd20'>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                <button className='subsButton' onClick={handleSubmit}>제출</button>
            </ModalContent>
        </ModalOverlay>
    );
};

export default ArticlePreview;
