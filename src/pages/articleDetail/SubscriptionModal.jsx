import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 40px 20px;
    border-radius: 20px;
    width: 500px;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    height: 230px;
}
`;

const CloseButton = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;

const SubscriptionModal = ({ isOpen, onClose, onUnsubscribe, onEmailSubscribe, onEmailUnsubscribe }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <h3 onClick={onEmailSubscribe}><i class="bi bi-envelope-check"></i>&nbsp;&nbsp;&nbsp;메일 수신</h3>
                <hr></hr>
                <h3 onClick={onEmailUnsubscribe}><i class="bi bi-envelope-x-fill"></i>&nbsp;&nbsp;&nbsp;메일 미수신</h3>
                <hr></hr>
                <h3 onClick={onUnsubscribe}><i class="bi bi-dash-circle"></i>&nbsp;&nbsp;&nbsp;구독 취소</h3>
            </ModalContent>
        </ModalOverlay>
    );
};

export default SubscriptionModal;
