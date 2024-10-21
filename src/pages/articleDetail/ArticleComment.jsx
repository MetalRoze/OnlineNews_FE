import React, { useState } from 'react';

const ArticleComment = () => {
    const [newComment, setNewComment] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [comments, setComments] = useState([
        {
            commentId: '01',
            user: 'wangwang',
            date: '2024.09.27 9:23',
            content: 'Lorem, ipsum dolor sit amet consectetur.',
            likeCount: '511',
            isActive: false,
            replies: [],
            isReplyVisible: false,
        },
        {
            commentId: '02',
            user: 'malmal',
            date: '2024.09.27 10:23',
            content: 'Lorem, ipsum dolor sit amet consectetur.',
            likeCount: '221',
            isActive: false,
            replies: [],
            isReplyVisible: false,
        },
    ]);

    // 이름 변환
    const obfuscateUsername = (username) => {
        if (username.length <= 2) {
            return username;
        }
        const firstChar = username.charAt(0);
        const lastChar = username.charAt(username.length - 1);
        const obscuredPart = '*'.repeat(username.length - 2);
        return `${firstChar}${obscuredPart}${lastChar}`;
    };

    // 댓글
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

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const toggleReplies = (commentId) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.commentId === commentId ? { ...comment, isReplyVisible: !comment.isReplyVisible } : comment
            )
        );
    };


    const handleLikeToggle = (commentId) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.commentId === commentId
                    ? {
                        ...comment,
                        isActive: !comment.isActive,
                        likeCount: comment.isActive
                            ? (parseInt(comment.likeCount) - 1).toString()
                            : (parseInt(comment.likeCount) + 1).toString()
                    }
                    : comment
            )
        );
    };

    // 답글
    const handleReplyChange = (e) => {
        setReplyContent(e.target.value);
    };

    const handleReplySubmit = (commentId) => {
        if (replyContent.trim()) {
            const newReplyData = {
                commentId: Date.now().toString(),
                user: 'yourUsername',
                date: new Date().toLocaleString(),
                content: replyContent,
                likeCount: '0',
                isActive: false,
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
    const handleReplyLikeToggle = (commentId, replyId) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.commentId === commentId
                    ? {
                        ...comment,
                        replies: comment.replies.map(reply =>
                            reply.commentId === replyId
                                ? {
                                    ...reply,
                                    isActive: !reply.isActive,
                                    likeCount: reply.isActive
                                        ? (parseInt(reply.likeCount) - 1).toString()
                                        : (parseInt(reply.likeCount) + 1).toString()
                                }
                                : reply
                        )
                    }
                    : comment
            )
        );
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
                                <h6 className='m0'>{obfuscateUsername(comment.user)}</h6>
                                <small className='gray40'>{comment.date}</small>
                            </div>
                        </div>
                        <p className='mt05'>{comment.content}</p>
                        <div className='flex'>
                            <p className={`cursor-pointer ${comment.isReplyVisible ? 'blue' : ''}`} onClick={() => toggleReplies(comment.commentId)}>
                                답글 {comment.replies.length}
                            </p>
                            <i
                                className={`bi block taCenter mlAuto ${comment.isActive ? 'bi-heart-fill blue' : 'bi-heart'}`}
                                onClick={() => handleLikeToggle(comment.commentId)}
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
                                                <h6 className='m0'>{obfuscateUsername(reply.user)}</h6>
                                                <small className='gray40'>{reply.date}</small>
                                            </div>
                                        </div>
                                        <p className='mt05'>{reply.content}</p>
                                        <div className='flex'>
                                            <i
                                                className={`bi block taCenter mlAuto ${reply.isActive ? 'bi-heart-fill blue' : 'bi-heart'}`}
                                                onClick={() => handleReplyLikeToggle(comment.commentId, reply.commentId)}
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
