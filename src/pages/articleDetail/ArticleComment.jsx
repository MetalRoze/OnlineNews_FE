import React, { useState, useEffect } from 'react';
import MyPagination from '../../components/Pagination';
import { getRequest, postRequest, deleteRequest, putRequest } from '../../apis/axios';
import { dateOnly } from '../../utils/formDateTime';
import profileIcon from '../../assets/profileDefault.png';

const ArticleComment = ({
    articleId
}) => {
    const [newComment, setNewComment] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [comments, setComments] = useState([]);

    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [itemsCountPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [resetKey, setResetKey] = useState(0);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIdx = (currentPage - 1) * itemsCountPerPage;
    const endIdx = startIdx + itemsCountPerPage;
    const currentComment = comments.slice(startIdx, endIdx);

    const [nowUser, setNowUser] = useState('')
    const fetchUser = async () => {
        try {
            sessionStorage.getItem('authToken')

            const userResponse = await getRequest('/api/user/myPage');
            setNowUser(userResponse.data.id);
            return true;
        } catch (error) {
            alert('로그인 후 사용할 수 있는 기능입니다.');
            return false;
        }
    };

    const [activeSort, setActiveSort] = useState('')
    // 댓글/답글 조회
    const fetchComment = async (sortType = 'latest') => {
        getRequest(`/api/comment/article/${articleId}?sortType=${sortType}`)
            .then(response => {
                const updatedComments = response.data.map(comment => ({
                    ...comment,
                    isReplyVisible: false,
                    isActive: false,
                    replies: comment.replies.map(reply => ({
                        ...reply,
                        isActive: false
                    }))
                }));

                setActiveSort(sortType)
                setComments(updatedComments)
                console.log(updatedComments)
                setTotalItemsCount(updatedComments.length);
                setResetKey(prevKey => prevKey + 1);
                setCurrentPage(1)
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

        if (await fetchUser()) {
            if (newComment.trim()) {
                const newCommentData = {
                    articleId: articleId,
                    content: newComment
                };
                try {
                    const response = await postRequest('/api/comment', newCommentData);
                    setComments(prevComments => [response.data, ...prevComments]);

                    setTotalItemsCount(comments.length + 1);
                    setNewComment('');
                } catch (error) {
                    alert("댓글 작성에 실패했습니다.")
                }
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

    // 답글
    const handleReplyChange = (e) => {
        setReplyContent(e.target.value);
    };

    const handleReplySubmit = async (commentId) => {

        if (await fetchUser()) {
            if (replyContent.trim()) {
                const newReplyData = {
                    commentID: commentId,
                    content: replyContent
                };

                try {
                    const response = await postRequest('/api/comment/replies', newReplyData);
                    const newReply = response.data;
                    setComments(prevComments =>
                        prevComments.map(comment =>
                            comment.id === commentId
                                ? {
                                    ...comment,
                                    replies: [...comment.replies, newReply]
                                }
                                : comment
                        )
                    );
                    setReplyContent('');
                } catch (error) {
                    alert("답글 작성에 실패했습니다.")
                }
            }
        }
    };
    const handleLikeToggle = async (commentId, likeStatus, type) => {
        try {
            if (type === 'comment') {
                if (likeStatus) {
                    await postRequest(`/api/comment/${commentId}/unlike`);
                    setComments(prevComments =>
                        prevComments.map(comment =>
                            comment.id === commentId
                                ? { ...comment, likeStatus: false, likeCount: comment.likeCount - 1 }
                                : comment
                        )
                    );
                } else {
                    await postRequest(`/api/comment/${commentId}/like`);
                    setComments(prevComments =>
                        prevComments.map(comment =>
                            comment.id === commentId
                                ? { ...comment, likeStatus: true, likeCount: comment.likeCount + 1 }
                                : comment
                        )
                    );
                }
            } else if (type === 'reply') {
                if (likeStatus) {
                    await postRequest(`/api/comment/${commentId}/unlike`);
                    setComments(prevComments =>
                        prevComments.map(comment => ({
                            ...comment,
                            replies: comment.replies.map(reply =>
                                reply.id === commentId
                                    ? { ...reply, likeStatus: false, likeCount: reply.likeCount - 1 }
                                    : reply
                            )
                        }))
                    );
                } else {
                    await postRequest(`/api/comment/${commentId}/like`);
                    setComments(prevComments =>
                        prevComments.map(comment => ({
                            ...comment,
                            replies: comment.replies.map(reply =>
                                reply.id === commentId
                                    ? { ...reply, likeStatus: true, likeCount: reply.likeCount + 1 }
                                    : reply
                            )
                        }))
                    );
                }
            }
        } catch (error) {
            alert("좋아요를 누를 수 없습니다.");
        }
    };

    const handleEditClick = async (commentId, content, isEdit, type) => {

        if (await fetchUser()) {
            const updateComment = (comment) => {
                return comment.id === commentId ? { ...comment, isEdit: !isEdit } : comment;
            };

            const updateReply = (reply) => {
                return reply.id === commentId ? { ...reply, isEdit: !isEdit } : reply;
            };

            if (!isEdit) {
                setComments(prevComments =>
                    prevComments.map(comment =>
                        type === 'comment' ? updateComment(comment) : {
                            ...comment,
                            replies: comment.replies.map(reply => updateReply(reply))
                        }
                    )
                );
            } else {
                const newCommentData = { commentID: commentId, content };

                try {
                    await putRequest('/api/comment/edit', newCommentData);
                    setComments(prevComments =>
                        prevComments.map(comment => {
                            if (comment.id === commentId && type === 'comment') {
                                return { ...comment, content, isEdit: false };
                            }

                            return {
                                ...comment,
                                replies: comment.replies.map(reply =>
                                    reply.id === commentId && type === 'reply'
                                        ? { ...reply, content, isEdit: false }
                                        : reply
                                )
                            };
                        })
                    );
                } catch (error) {
                    alert("수정 실패", error);
                }
            }
        }
    };

    const handleDelete = async (commentId, type) => {
        if (await fetchUser()) {
            const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");

            if (!isConfirmed) {
                return;
            }

            try {
                await deleteRequest(`/api/comment/${commentId}`);

                setComments(prevComments =>
                    prevComments.map(comment => {
                        if (type === 'comment' && comment.id === commentId) {
                            return null;
                        }

                        // 답글 처리
                        const updatedReplies = comment.replies.filter(reply => reply.id !== commentId);
                        return {
                            ...comment,
                            replies: updatedReplies
                        };
                    }).filter(comment => comment !== null)
                );

                setTotalItemsCount(comments.length - 1);
            } catch (error) {
                alert("삭제 실패", error);
            }
        }
    };

    useEffect(() => {
        if (articleId) {
            fetchComment();
            fetchUser();
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
            <div className='flex mt2 mb1'>
                <div>총 {totalItemsCount}개</div>
                <div className='flex1'></div>
                <div className={`${activeSort === 'latest' ? 'black pointer' : 'gray40 pointer'}`} onClick={() => fetchComment('latest')}>최신순</div>
                <div className={`ml1 ${activeSort === 'oldest' ? 'black pointer' : 'gray40 pointer'}`} onClick={() => fetchComment('oldest')}>오래된순</div>
                <div className={`ml1 ${activeSort === 'like' ? 'black pointer' : 'gray40 pointer'}`} onClick={() => fetchComment('like')}>좋아요순</div>
            </div>
            <div className='pd10 mb2'>

                {totalItemsCount < 1 &&
                    <div>댓글이 없습니다.</div>}
                {currentComment.map((comment) => (
                    <div key={comment.id} className='mb1'>
                        <div className='flex'>
                            <img className='profile40' src={comment.userImg || profileIcon} />
                            <div className='mtbAuto ml05'>
                                <h6 className='m0'>{obfuscateUsername(comment.userName)}</h6>
                                <small className='gray40'>{dateOnly(new Date(comment.createdAt))}</small>
                            </div>
                            <div className='flex1'></div>
                            {comment.userId === nowUser && (

                                <div className='flex'>
                                    <div className='mr05 hoverGray' onClick={() => handleEditClick(comment.id, comment.content, comment.isEdit, 'comment')}>수정</div>
                                    <div className='hoverGray' onClick={() => handleDelete(comment.id, 'comment')}>삭제</div>
                                </div>)}
                        </div>

                        {comment.isEdit ? (
                            <textarea
                                className='mt1'
                                value={comment.content}
                                onChange={(e) => {
                                    setComments(prevComments =>
                                        prevComments.map(c =>
                                            c.id === comment.id
                                                ? { ...c, content: e.target.value }
                                                : c
                                        )
                                    );
                                }}
                            />) : (
                            <p className='mt05'>{comment.content}</p>)}
                        <div className='flex mb1'>
                            <small className={`pointer ${comment.isReplyVisible ? 'blue' : ''}`} onClick={() => toggleReplies(comment.id)}>
                                답글 {comment.replies.length} {comment.isReplyVisible ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
                            </small>

                            <i
                                className={`bi block taCenter mlAuto ${comment.likeStatus ? 'bi-heart-fill blue' : 'bi-heart'}`}
                                onClick={() => handleLikeToggle(comment.id, comment.likeStatus, 'comment')}
                            ></i>
                            <small className='taCenter ml05'>{comment.likeCount}</small>
                        </div>

                        {comment.isReplyVisible && (
                            <div className='pdlr20'>
                                {comment.replies.map((reply) => (
                                    <div key={reply.id}>
                                        <div className='flex'>
                                            <img className='profile40' src={reply.userImg || profileIcon} />
                                            <div className='mtbAuto ml05'>
                                                <h6 className='m0'>{obfuscateUsername(reply.userName)}</h6>
                                                <small className='gray40'>{dateOnly(new Date(reply.createdAt))}</small>
                                            </div>
                                            <div className='flex1'></div>
                                            {reply.userId === nowUser && (

                                                <div className='flex'>
                                                    <div className='mr05 hoverGray' onClick={() => handleEditClick(reply.id, reply.content, reply.isEdit, 'reply')}>수정</div>
                                                    <div className='hoverGray' onClick={() => handleDelete(reply.id, 'reply')}>삭제</div>
                                                </div>)}
                                        </div>

                                        {reply.isEdit ? (
                                            <textarea

                                                className='mt1'
                                                value={reply.content}
                                                onChange={(e) => {
                                                    setComments(prevComments =>
                                                        prevComments.map(c =>
                                                            c.id === comment.id
                                                                ? {
                                                                    ...c,
                                                                    replies: c.replies.map(r =>
                                                                        r.id === reply.id
                                                                            ? { ...r, content: e.target.value }
                                                                            : r
                                                                    )
                                                                }
                                                                : c
                                                        )
                                                    );
                                                }}
                                            />) : (
                                            <p className='mt05'>{reply.content}</p>)}
                                        <div className='flex'>
                                            <i
                                                className={`bi block taCenter mlAuto ${reply.likeStatus ? 'bi-heart-fill blue' : 'bi-heart'}`}
                                                onClick={() => handleLikeToggle(reply.id, reply.likeStatus, 'reply')}
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


            {totalItemsCount > 0 &&

                <MyPagination
                    key={resetKey}
                    activePage={currentPage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                />}

        </div>
    );
};

export default ArticleComment;
