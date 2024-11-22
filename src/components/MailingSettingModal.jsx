import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MailingSettingModal = ({ showModal, handleClose, isSubscribed, handleSave }) => {
    const [isChecked, setIsChecked] = useState(isSubscribed);

    useEffect(() => {
        setIsChecked(isSubscribed);
    }, [isSubscribed, showModal]);

    const toggleSwitch = () => {
        setIsChecked(!isChecked);
    };

    const saveChanges = () => {
        handleSave(isChecked);
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: '1.3rem' }}>메일링 수신 설정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <div className="d-flex justify-content-between align-items-center">
                            <span style={{ fontSize: '1.25rem' }}>
                                {isChecked ? '메일 수신 활성화' : '메일 수신 비활성화'}
                            </span>
                            <Form.Check 
                                type="switch"
                                id="mailing-switch"
                                checked={isChecked}
                                onChange={toggleSwitch}
                                style={{ fontSize: '1.25rem' }}
                            />
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                    저장
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MailingSettingModal;
