import React, { useState, useEffect } from 'react';
import formDateTime from '../../utils/formDateTime';
import profileIcon from '../../assets/profileDefault.png';

const ArticleContent = ({
    article
}) => {

    return (
        <div>
            <div>
                <h1 className='mt1'>{article.title}</h1>
                {article.subtitle.split(',./').map((sub, index) => (
                    <h3 className='articleSubtitle' key={index}>{sub.trim()}</h3>
                ))}
                <small className='mt1 gray30 block'>입력 {formDateTime(new Date(article.createdAt))}</small>
                {article.modifiedAt && (
                    <small className='mt1 gray30'>수정 {formDateTime(new Date(article.modifiedAt))}</small>
                )}<div className='mt1 taRight'>
                    <p className='mr1 inline'>{article.userName} 기자</p>
                    <img className='profile50' src={article.userImg || profileIcon} />
                </div>
            </div>
            <hr style={{ margin: '1rem 0' }} />
            <div className='pd20 ql-snow'>
                <div className='ql-editor' style={{ padding: '0px' }}>
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            </div>
        </div>
    );
};

export default ArticleContent;
