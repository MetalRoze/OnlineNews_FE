import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import profileIcon from '../../assets/profileDefault.png';

const ArticlePreview = ({ isLoading, authorName, authorImg, articleDate, title, subTitles, content, onClose, handleSubmit }) => {


    return (
        <div className='articlePreviewContainer'>
            {isLoading && (
                <div className='articlePreviewContainer'>
                    <div className="flex column align-items-center" style={{ position: 'absolute' }}>
                        <div className="spinner-border text-light" role="status" aria-hidden="true" />
                        <div className='mt1 text-light'>업로드 중</div>
                    </div>
                </div>
            )}

            <div className='preview'>
                <div className='mlAuto pointer' onClick={onClose}>
                    <i style={{ fontSize: "1.25rem", color: "var(--color-black)" }} className="bi bi-x-circle"></i></div>
                <div>
                    <h1 className='mt1'>{title}</h1>

                    {subTitles.map((subtitle, index) => (
                        <div key={index} className='mt1 mb1 articleSubtitle'>{subtitle}</div>
                    ))}
                    <small className='gray40'>입력 {articleDate}</small>
                    <div className='mt1 taRight'>
                        <p className='mr1 inline'>{authorName} 기자</p>
                        <img className='profile50' src={authorImg || profileIcon} alt="Author" />
                    </div>
                    <hr style={{ margin: '1rem 0' }} />
                    <div className='pd20 ql-snow'>
                        <div className='ql-editor' style={{ padding: '0px' }}>
                            <div dangerouslySetInnerHTML={{ __html: JSON.parse(content) }} />
                        </div>
                    </div>
                </div>
                <button className='subsButton mtAuto' onClick={handleSubmit}>제출
                </button>
            </div>
        </div>
    );
};
export default ArticlePreview;
