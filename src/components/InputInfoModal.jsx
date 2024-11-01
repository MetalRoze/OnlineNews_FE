import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const InputInfoModal = ({ showModal, handleClose, titleLabel, value, handleSave }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setInputValue(value);
    }, [value, showModal]);

    const saveChanges = () => {
        handleSave(inputValue);
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>{titleLabel}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="inputValue">
                        <Form.Control 
                            type="text" 
                            style={{ fontSize: "1.25rem" }} 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)} 
                            placeholder="값을 입력하세요"
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InputInfoModal;
