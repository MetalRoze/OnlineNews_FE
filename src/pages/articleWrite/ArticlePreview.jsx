import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';

const ArticlePreview = ({ authorName, articleDate, title, subTitles, content, onClose, handleSubmit, category }) => {


    return (
        <div className='articlePreviewContainer'>
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
                        <img className='br50' src="https://placehold.co/50x50" alt="Author" />
                    </div>
                    <hr style={{ margin: '1rem 0' }} />
                    <div className='pd20 ql-snow'>
                        <div className='ql-editor' style={{ padding: '0px' }}>
                            <div dangerouslySetInnerHTML={{ __html: JSON.parse(content) }} />
                        </div>
                    </div>
                </div>
                <button className='subsButton mtAuto' onClick={handleSubmit}>제출</button>
            </div>
        </div>
    );
};
export default ArticlePreview;
