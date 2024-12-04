import React, { useEffect } from 'react';
import QuillEditor from './QuillEditor';
import Category from '../../components/Category'
import GPTEditor from './GPTEditor'

const ArticleWriteForm = ({ title, setTitle, authorImg, subTitles, handleContent, handleSubtitleChange, handleEditorChange, addSubtitleForm, minusSubtitleForm, selectedCategory,
    setSelectedCategory, content }) => {


    return (
        <div>
            <h4 className="mr1 mtbAuto">
                제목
            </h4>
            <input
                type="text"
                className="mtb1"
                placeholder="제목을 입력해 주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <hr />
            <div className='mt1 flex'>
                <h4 className="mr1 mtbAuto">
                    소제목
                </h4>
                <i className="bi bi-plus-square-fill" onClick={addSubtitleForm} style={{ cursor: 'pointer', fontSize: '1.15rem' }}></i>
            </div>
            {subTitles.map((subtitle, index) => (
                <div key={index}>
                    <div className='flex'>
                        <input
                            className="mtb1"
                            type="text"
                            placeholder={`소제목 ${index + 1}를 입력해 주세요`}
                            value={subtitle}
                            onChange={(e) => handleSubtitleChange(index, e.target.value)}
                        />
                        <i className="bi bi-dash-square-fill mAuto"
                            onClick={() => minusSubtitleForm(index)} style={{ cursor: 'pointer', fontSize: '1.15rem' }}></i>
                    </div>
                    <hr />
                </div>
            ))}

            <div className="flex mtb1">
                <h4 className="mr1 mtbAuto wsNowrap">카테고리</h4>
                <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>

            <hr />

            <div className='mt1 flex'>
                <h4 className="mr1 mtbAuto">
                    기사 작성
                </h4>
                <div className='flex1'></div>
                <GPTEditor authorImg={authorImg} />
            </div>
            <QuillEditor onChange={handleEditorChange} content={content} />
            <div className="flex">
                <div className='flex1'></div>
                <button onClick={handleContent}>미리보기</button>
            </div>
        </div>

    );
};
export default ArticleWriteForm;