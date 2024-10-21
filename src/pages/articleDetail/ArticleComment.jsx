import React, { useState } from 'react';

const ArticleComment = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [comments, setComments] = useState([
        {
            commentId: '01',
            user: 'wangwang',
            date: '2024.09.27 9:23',
            content: 'Lorem, ipsum dolor sit amet consectetur.',
            likeCount: '511',
            replies: [],
            isReplyVisible: false,
        },
        {
            commentId: '02',
            user: 'malmal',
            date: '2024.09.27 10:23',
            content: 'Lorem, ipsum dolor sit amet consectetur.',
            likeCount: '221',
            replies: [],
            isReplyVisible: false,
        },
    ]);

    const toggleReplies = (commentId) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.commentId === commentId ? { ...comment, isReplyVisible: !comment.isReplyVisible } : comment
            )
        );
    };

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleReplyChange = (e) => {
        setReplyContent(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            const newCommentData = {
                commentId: Date.now().toString(),
                user: 'yourUsername',
                date: new Date().toLocaleString(),
                content: newComment,
                likeCount: '0',
                replies: [],
                isReplyVisible: false,
            };
            setComments(prevComments => [...prevComments, newCommentData]);
            setNewComment('');
        }
    };

    const handleReplySubmit = (commentId) => {
        if (replyContent.trim()) {
            const newReplyData = {
                commentId: Date.now().toString(),
                user: 'yourUsername',
                date: new Date().toLocaleString(),
                content: replyContent,
                likeCount: '0',
            };
            setComments(prevComments =>
                prevComments.map(comment =>
                    comment.commentId === commentId
                        ? { ...comment, replies: [...comment.replies, newReplyData] }
                        : comment
                )
            );
            setReplyContent('');
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className='mt2'>
            <div className='mb1'>
                <textarea
                    value={newComment}
                    onChange={handleNewCommentChange}
                    placeholder="댓글을 입력하세요..."
                    rows="3"
                />
                <div className='flex'>
                    <button
                        onClick={handleCommentSubmit}
                        className='blueButton mlAuto'>
                        댓글 작성
                    </button></div>
            </div>
            <h3 className='mb1'>댓글</h3>
            <div className='pd10'>
                {comments.map((comment) => (
                    <div key={comment.commentId} className='mb1'>
                        <div className='flex'>
                            <img className='br50' src="https://placehold.co/40x40" alt="User Avatar" />
                            <div className='mtbAuto ml05'>
                                <h6 className='m0'>{comment.user}</h6>
                                <small className='gray40'>{comment.date}</small>
                            </div>
                        </div>
                        <p className='mt05'>{comment.content}</p>
                        <div className='flex'>
                            <p className={`cursor-pointer ${comment.isReplyVisible ? 'blue' : ''}`} onClick={() => toggleReplies(comment.commentId)}>
                                답글 {comment.replies.length}
                            </p>
                            <i
                                className={`bi block taCenter mlAuto ${isActive || isHovered ? 'bi-heart-fill blue' : 'bi-heart'}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => setIsActive(!isActive)}
                            ></i>
                            <small className='taCenter ml05'>{comment.likeCount}</small>
                        </div>
                        {comment.isReplyVisible && (
                            <div className='pdlr20'>
                                {comment.replies.map((reply) => (
                                    <div key={reply.commentId} className='mb1'>
                                        <div className='flex'>
                                            <img className='br50' src="https://placehold.co/40x40" alt="User Avatar" />
                                            <div className='mtbAuto ml05'>
                                                <h6 className='m0'>{reply.user}</h6>
                                                <small className='gray40'>{reply.date}</small>
                                            </div>
                                        </div>
                                        <p className='mt05'>{reply.content}</p>
                                        <div className='flex'>
                                            <i
                                                className={`bi block taCenter mlAuto ${isActive || isHovered ? 'bi-heart-fill blue' : 'bi-heart'}`}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                onClick={() => setIsActive(!isActive)}
                                            ></i>
                                            <small className='taCenter ml05'>{reply.likeCount}</small>
                                        </div>
                                    </div>
                                ))}
                                <textarea
                                    value={replyContent}
                                    onChange={handleReplyChange}
                                    placeholder="답글을 입력하세요..."
                                    rows="2"
                                />
                                <div className='flex'>
                                    <button
                                        onClick={() => handleReplySubmit(comment.commentId)}
                                        className='blueButton mlAuto'
                                        style={{ marginTop: '5px' }}>
                                        답글 작성
                                    </button>
                                </div>
                            </div>
                        )}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleComment;
