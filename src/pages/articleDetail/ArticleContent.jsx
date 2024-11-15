import React, { useState, useEffect } from 'react';
import formDateTime from '../../utils/formDateTime';

const ArticleContent = ({
    article
}) => {

    return (
        <div>
            <div>
                <img className='br10' src={article.publisherImage} alt="Bootstrap" />
                <h1 className='mt1'>{article.title}</h1>
                {article.subtitle.split(',./').map((sub, index) => (
                    <h2 className='articleSubtitle' key={index}>{sub.trim()}</h2>  // 공백 제거
                ))}
                <small className='mt1 gray40 block'>발행일자 {formDateTime(new Date(article.createdAt))}</small>
                {article.modifiedAt && (
                    <small className='mt1 gray40'>수정일자 {formDateTime(new Date(article.modifiedAt))}</small>
                )}<div className='mt1 taRight'>
                    <p className='mr1 inline'>{article.userName} 기자</p>
                    <img className='ACprofileImg' src={article.userImg} alt="Author" />
                </div>
            </div>
            <hr style={{ margin: '1rem 0' }} />
            <div className='pd20 ql-snow'>
                <div className='ql-editor' style={{padding:'0px'}}>
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            </div>
        </div>
    );
};

export default ArticleContent;
