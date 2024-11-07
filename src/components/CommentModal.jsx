import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentModal = ({ showModal, handleClose }) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!comment.trim()) {
            setError('코멘트를 입력해주세요.');
            return;
        }
        console.log('저장된 코멘트:', comment);
        handleClose(); 
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
                <Button variant="primary" onClick={handleSave}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CommentModal;
