import React, { useState } from 'react';
import profileIcon from '../../assets/profileDefault.png';
import gptLarge from '../../assets/gptLarge.png';
import gptSmall from '../../assets/gptSmall.png';
import { postRequest } from '../../apis/axios.jsx';

const GPTEditor = ({
    authorImg
}) => {
    const [keyword, setKeyword] = useState('');
    const [article, setArticle] = useState('');
    const [copyMessage, setCopyMessage] = useState('복사하기');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleGenerateClick = async () => {
        if (keyword) {
            setIsLoading(true);
            try {
                const response = await postRequest('/api/gpt/ask',
                    { question: keyword })

                if (response.status === 200) {
                    setArticle(response.data.choices[0].message.content);
                    setCopyMessage('복사하기');
                }
            } catch (error) {
                console.error(error);
                alert(error)
            } finally {
                setIsLoading(false);
            }
        } else {
            alert('요청을 입력해 주세요.');
        }
    };

    const handleCopyClick = (e) => {
        if (article) {
            navigator.clipboard.writeText(article).then(
                () => {
                    setCopyMessage('복사되었습니다!');
                },
                (err) => {
                    setCopyMessage('복사 실패');
                }
            );
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setKeyword('')
        setArticle('')
        setIsModalOpen(false);
    };
    return (
        <div className="mtb1 pointer">
            <img style={{ width: '100px' }} onClick={openModal} src={gptLarge} />
            {isModalOpen && (
                <div className="blackModal">
                    <div className="preview">

                        <div className='flex spaceBetween mb1'>
                            <img className='profile40' style={{ backgroundColor: 'white', padding: '2px' }} src={gptSmall} />
                            <h4 className='mtbAuto'>chatGPT 도움 받기</h4>
                            <i style={{ fontSize: "1.25rem", color: "var(--color-black)" }} className="bi bi-x-circle pointer" onClick={closeModal}></i>
                        </div>

                        <hr />
                        <div className='flex mt1'>
                            <img className='profile40 mtbAuto' src={authorImg || profileIcon} alt="User" />
                            <input
                                type="text"
                                className="mtb1"
                                placeholder="도움을 요청해 보세요..."
                                value={keyword}
                                onChange={handleKeywordChange}
                            />

                            {!article && (
                                <i onClick={handleGenerateClick} className="bi bi-arrow-up-circle-fill mtbAuto hoverBlack" style={{ fontSize: '24px', cursor: 'pointer' }}></i>)}
                        </div>
                        <div className='flex mt1'>

                            {article && (
                                <img className='profile40' style={{ backgroundColor: 'white', padding: '2px' }} src={gptSmall} />
                            )}

                            {!isLoading ? (
                                <div>
                                    <div className='pd10 mtbAuto' style={{
                                        wordWrap: 'break-word',
                                        wordBreak: 'break-word'
                                    }}>{article}</div>
                                </div>

                            ) : (
                                <div className="flex column align-items-center flex1">
                                    <div className="spinner-border" role="status" aria-hidden="true" />
                                    <div className='mt1'>답변 기다리는 중...</div>
                                </div>
                            )}

                            {article && (
                                <div className='hoverGray mlAuto wsNowrap' onClick={handleCopyClick}>{copyMessage}</div>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GPTEditor;
