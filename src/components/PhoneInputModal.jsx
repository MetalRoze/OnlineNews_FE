import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PhoneInputModal = ({ showModal, handleClose, value = '', handleSave }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setInputValue(value);
    }, [value, showModal]);

    const handleChange = (e) => {
        let input = e.target.value.replace(/\D/g, '');
        if (input.length <= 3) {
            setInputValue(input);
        } else if (input.length <= 7) {
            setInputValue(`${input.slice(0, 3)}-${input.slice(3)}`);
        } else {
            setInputValue(`${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`);
        }
    };
    

    const saveChanges = () => {
        handleSave(inputValue);
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>휴대폰 번호</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="inputPhoneNumber">
                        <Form.Control
                            type="text"
                            className="form-control"
                            style={{ fontSize: "1.25rem" }}
                            value={inputValue}
                            onChange={handleChange}
                            autoFocus
                            inputMode="numeric"
                            pattern="[0-9]*"
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

export default PhoneInputModal;
