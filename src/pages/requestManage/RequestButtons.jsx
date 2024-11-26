import React, { useState } from 'react';
import CommentModal from '../../components/CommentModal';
import { postRequest, patchRequest } from '../../apis/axios';

const RequestButtons = ({ request, article, status, type }) => {
    const [activeButton, setActiveButton] = useState(status);
    const [showModal, setShowModal] = useState(false);

    const handleClickAccpet = async (reqId) => {
        try {
            setActiveButton('accept');
            const url = article
                ? `/api/request/${reqId}/approve` //기사 승인
                : `/api/request/${reqId}/enroll`; //시민기자 승인
            const response = await patchRequest(url);
            console.log(response.status);
            if(response.status==='200'){
                alert("승인되었습니다.")
            }
        } catch (error) {
            console.error("승인 실패", error);
        }
    };

    const handleClickPrivateAccpet = async (articleId) => {
        try {
            setActiveButton('accept');
            const url =`/api/article/${articleId}/private`;
            const response = await patchRequest(url);
            console.log(response.status);
            if(response.status==='200'){
                alert("승인되었습니다.")
            }
        } catch (error) {
            console.error("승인 실패", error);
        }
    };
    const handleOpenModal = (type) => {
        setActiveButton(type);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='flex desktop-request-3buttons br10'>
            <button
                onClick={type!=='비공개 요청' ? () => handleClickAccpet(request.id): () => handleClickPrivateAccpet(article.id)}
                className={activeButton === 'APPROVED' ? 'active' : ''}
            >
                승인
            </button>
            {article && 
                <button
                    onClick={() => handleOpenModal('hold')}
                    className={activeButton === 'HOLDING' ? 'active' : ''}
                >
                    보류
                </button>
            }
            <button
                onClick={() => handleOpenModal('reject')}
                className={activeButton === 'REJECTED' ? 'active' : ''}
            >
                거절
            </button>
            {request && <CommentModal showModal={showModal} handleClose={handleCloseModal} type={activeButton} reqId={request.id} />}
        </div>
    );
};


export default RequestButtons;
