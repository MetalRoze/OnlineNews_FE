import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const QuillEditor = () => {

    const modules = {
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
                ["link", "image"],
            ],
        },
    };
    return (
        <div style={{ height: '70vh' }} >
            <ReactQuill style={{ width: '100%', height: '80%' }} theme="snow" modules={modules} />
        </div >
    );
};

export default QuillEditor;
