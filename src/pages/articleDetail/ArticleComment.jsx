import React, { useState, useEffect } from 'react';

import { getRequest, postRequest, deleteRequest } from '../../apis/axios';
const ArticleComment = ({
    articleId
}) => {
    const [newComment, setNewComment] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [comments, setComments] = useState([]);

    // 댓글/답글 조회
    const fetchComment = async () => {
        getRequest(`/api/comment/article/${articleId}`)
            .then(response => {
                const updatedComments = response.data.map(comment => ({
                    ...comment, 
                    isReplyVisible: false, 
                    isActive: false
                }));
    
                setComments(updatedComments)
                console.log(updatedComments)
            })
            .catch(error => {
                console.error('Error fetching subscriptions:', error);
            });
    };

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

    // 댓글 달기
    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            const newCommentData = {
                articleId: articleId,
                content: newComment
            };

            try {
                console.log('cc', newCommentData)
                await postRequest('/api/comment', newCommentData);
                fetchComment();
            } catch (error) {
                alert("댓글 작성에 실패했습니다.")
            }
        }
    };

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const toggleReplies = (commentId) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId ? { ...comment, isReplyVisible: !comment.isReplyVisible } : comment
            )
        );
    };


    const handleLikeToggle = (commentId) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
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
                    comment.id === commentId
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
                comment.id === commentId
                    ? {
                        ...comment,
                        replies: comment.replies.map(reply =>
                            reply.id === replyId
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

    useEffect(() => {
        if (articleId) {
            fetchComment();
        }
    }, [articleId]);

    return (
        <div className='mt2'>
            <h3 className='mb1'>댓글</h3>
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
            <div className='pd10'>
                {comments.map((comment) => (
                    <div key={comment.id} className='mb1'>
                        <div className='flex'>
                            <img className='br50' src="https://placehold.co/40x40" alt="User Avatar" />
                            <div className='mtbAuto ml05'>
                                <h6 className='m0'>{obfuscateUsername(comment.userName)}</h6>
                                <small className='gray40'>{comment.createdAt}</small>
                            </div>
                        </div>
                        <p className='mt05'>{comment.content}</p>
                        <div className='flex mb1'>
                            <small className={`cursor-pointer ${comment.isReplyVisible ? 'blue' : ''}`} onClick={() => toggleReplies(comment.id)}>
                                답글 {comment.replies.length} {comment.isReplyVisible ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
                            </small>

                            <i
                                className={`bi block taCenter mlAuto ${comment.isActive ? 'bi-heart-fill blue' : 'bi-heart'}`}
                                onClick={() => handleLikeToggle(comment.id)}
                            ></i>
                            <small className='taCenter ml05'>{comment.likeCount}</small>
                        </div>

                        {comment.isReplyVisible && (
                            <div className='pdlr20'>
                                {comment.replies.map((reply) => (
                                    <div key={reply.id}>
                                        <div className='flex'>
                                            <img className='br50' src="https://placehold.co/40x40" alt="User Avatar" />
                                            <div className='mtbAuto ml05'>
                                                <h6 className='m0'>{obfuscateUsername(reply.userName)}</h6>
                                                <small className='gray40'>{reply.createdAt}</small>
                                            </div>
                                        </div>
                                        <p className='mt05'>{reply.content}</p>
                                        <div className='flex'>
                                            <i
                                                className={`bi block taCenter mlAuto ${reply.isActive ? 'bi-heart-fill blue' : 'bi-heart'}`}
                                                onClick={() => handleReplyLikeToggle(comment.id, reply.id)}
                                            ></i>
                                            <small className='taCenter ml05'>{reply.likeCount}</small>
                                        </div>
                                        <hr style={{ margin: '1rem 0' }}></hr>
                                    </div>
                                ))}

                                <textarea className='mt05'
                                    value={replyContent}
                                    onChange={handleReplyChange}
                                    placeholder="답글을 입력하세요..."
                                    rows="2"
                                />
                                <div className='flex'>
                                    <button
                                        onClick={() => handleReplySubmit(comment.id)}
                                        className='blueButton mlAuto'
                                        style={{ marginTop: '5px' }}>
                                        답글 작성
                                    </button>
                                </div>
                            </div>
                        )}
                        <hr style={{ margin: '1rem 0' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleComment;
