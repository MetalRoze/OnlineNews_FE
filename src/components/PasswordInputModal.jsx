import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PasswordModal = ({ showModal, handleClose, onSave}) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
        } else {
            console.log('비밀번호가 저장되었습니다.');
            onSave(newPassword);  
            handleClose();
        }
    };
    
    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>비밀번호 변경</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="newPassword">
                        <Form.Label>새 비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setError(''); 
                            }}
                            isInvalid={!!error} // 오류가 있을 경우 테두리 빨간색
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>비밀번호 확인</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError(''); 
                            }}
                            isInvalid={!!error} // 오류가 있을 경우 테두리 빨간색
                        />
                        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={!newPassword || !confirmPassword}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PasswordModal;
