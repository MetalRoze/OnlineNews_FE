import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const ArticlePreview = ({ title, subTitles, content, onClose }) => {
    const [articleDate, setArticleDate] = useState("입력 yyyy.mm.dd 오전 hh:mm");
    const [authorName, setAuthorName] = useState("홍길동");

    const handleSubmit = () => {
        const isConfirmed = window.confirm('기사를 제출하시겠습니까?');

        if (isConfirmed) {

            // 여기에서 api 연결
            const mergedSubTitles = subTitles.join(',./');
            navigate('/main');
        }
    };
    return (
        <ModalOverlay>
            <ModalContent>
                <div className='mlAuto pointer' onClick={onClose}>
                    <i style={{ fontSize: "1.25rem", color: "var(--color-black)" }} className="bi bi-x-circle"></i></div>
                <div>
                    <h1 className='mt1'>{title}</h1>

                    {subTitles.map((subtitle, index) => (
                        <div key={index} className='mt1 mb1 articleSubtitle'>{subtitle}</div>
                    ))}
                    <small className='gray40'>{articleDate}</small>
                    <div className='mt1 taRight'>
                        <p className='mr1 inline'>{authorName} 기자</p>
                        <img className='br50' src="https://placehold.co/50x50" alt="Author" />
                    </div>
                    <hr style={{ margin: '1rem 0' }} />
                    <div className='pd20 ql-snow'>
                        <div className='ql-editor'>
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    </div>
                </div>
                <button className='subsButton mtAuto' onClick={handleSubmit}>제출</button>
            </ModalContent>
        </ModalOverlay>
    );
};


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
    margin-left:10px;
    height:80vh;
    display:flex;
    flex-direction:column;
    overflow-y:auto;
     
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer */
    
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
`;
export default ArticlePreview;
