import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { putRequest } from '../apis/axios';

const CommentModal = ({ showModal, handleClose, type, reqId }) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const handleClick = (type, reqId) => {
        if (!comment.trim()) {
            setError('코멘트를 입력해주세요.');
            return;
        }
        if (type === 'hold') {
            handleClickHold(reqId);
        } else {
            console.log("거절");
        }
        handleClick();
    };
    const handleClickHold = async(reqId) => {
        try {
            const response = await putRequest(`/api/request/${reqId}/hold`, { comment: comment})
            console.log(response.status);
        } catch (error) {
            console.error('사용자 요청실패', error);
        }
    };
    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>코멘트 작성</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="comment">
                        <Form.Label>코멘트</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value);
                                setError('');
                            }}
                            isInvalid={!!error}
                            autoFocus
                        />
                        <Form.Control.Feedback type="invalid">
                            {error}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="primary" onClick={() => handleClick(type,reqId)}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CommentModal;
