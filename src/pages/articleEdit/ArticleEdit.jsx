import React, {useState} from 'react';
import ArticlePreview from '../articleWrite/ArticlePreview.jsx';
import ArticleWriteForm from '../articleWrite/ArticleWriteForm.jsx';
import ArticleWrite from '../articleWrite/ArticleWrite.jsx';
import { useNavigate } from 'react-router-dom';

const ArticleEdit = () => {

    const [originalContent, setOriginalContent] = useState('');
    const [content, setContent] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [articleDate, setArticleDate] = useState("");
    const [title, setTitle] = useState('');
    const [subTitles, setSubTitles] = useState(['']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handlePreviewToggle = () => {
        setIsPreviewOpen(!isPreviewOpen);
    };
    return (
        <div>
        <ArticleWriteForm
            title={title}
            setTitle={setTitle}
            subTitles={subTitles}
            setSubTitles={setSubTitles}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            content={content}
            setContent={setContent}
            handlePreviewToggle={handlePreviewToggle}
        />
        {isModalOpen && (
            <ArticlePreview
                title={title}
                subTitles={subTitles}
                content={content}
                onClose={() => setIsModalOpen(false)}
            />
        )}
        <button onClick={handleSaveChanges}>수정 완료</button>
    </div>
    );
};

export default ArticleEdit;
