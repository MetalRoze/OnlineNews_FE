import React from 'react';

const SubscriptionModal = ({ isOpen, onClose, onSubscribe, onUnsubscribe }) => {
    if (!isOpen) return null;

    return (
        <div className="modal" style={{ height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5)", position: "fixed", top: 0, left: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="modal-content" style={{ backgroundColor: "white", padding: "20px", borderRadius: "5px", position: "relative" }}>
                <span className="close-btn" onClick={onClose} style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}>&times;</span>
                <h2>구독 옵션</h2>
                <p>구독하시겠습니까?</p>
                <button onClick={onSubscribe}>구독</button>
                <button onClick={onUnsubscribe}>구독 취소</button>
            </div>
        </div>
    );
};

export default SubscriptionModal;
