import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

const QuillEditor = ({ onChange, content }) => {
    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = (content) => {
        setEditorContent(content);
        onChange(content);
    };

    React.useEffect(() => {
        setEditorContent(content);
    }, [content]);

    const formats = [
        'float',
        'width',
        'height',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'align',
        'link',
        'image'
    ];

    const modules = {
        imageActions: {},
        imageFormats: {},
        toolbar: {
            container: [
                [{ size: ["small", false, "large", "huge"] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { align: "" },
                    { align: "center" },
                    { align: "right" },
                    { align: "justify" }
                ],
                ["image"],
            ],
        },
    };

    return (
        <div style={{ height: '70vh' }}>
            <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                style={{ width: '100%', height: '80%' }}
                theme="snow"
                modules={modules}
                formats={formats}
            />
        </div>
    );
};

export default QuillEditor;
