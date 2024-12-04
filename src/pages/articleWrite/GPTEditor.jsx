import React, { useEffect, useState } from 'react';
import profileIcon from '../../assets/profileDefault.png';
import gptLarge from '../../assets/gptLarge.png';
import gptSmall from '../../assets/gptSmall.png';
import { postRequest } from '../../apis/axios.jsx';

const GPTEditor = ({
    authorImg
}) => {
    const [keyword, setKeyword] = useState('');
    const [comment, setComment] = useState('');
    const [copyMessage, setCopyMessage] = useState('복사');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, setState] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [keyword1, setKeyword1]=useState('')
    const [keyword2, setKeyword2]=useState('')
    const [keyword3, setKeyword3]=useState('')

    const handleKeyword1Change = (e) => {
        setKeyword1(e.target.value);
    };
    const handleKeyword2Change = (e) => {
        setKeyword2(e.target.value);
    };
    const handleKeyword3Change = (e) => {
        setKeyword3(e.target.value);
    };

    const handleGenerateClick = async () => {

        if(state===1){
            setKeyword('기사 주제 하나만 추천해줘.')
        }else if(state===2){
            setKeyword(keyword1+", "+keyword2+", "+keyword3+" 이 내용이 포함되도록 기사 작성해줘.")
        } else{
            setKeyword('"'+keyword1+'" 이 문장 교정해줘.');
        }
    };

    const handleCopyClick = (e) => {
        if (comment) {
            navigator.clipboard.writeText(comment).then(
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
        setKeyword1('')
        setKeyword2('')
        setKeyword3('')
        setComment('')
        setCopyMessage('복사');
        setIsModalOpen(false);
    };
    const handleBtn = (index) => {
        setState(index);
        setKeyword('')
        setKeyword1('')
        setKeyword2('')
        setKeyword3('')
        setCopyMessage('복사');
        setComment('')
    }

    useEffect(() => {
        const fetchData = async () => {
            if (keyword !== '' && keyword !== undefined && keyword !== null) {
                setIsLoading(true);
                try {
                    const response = await postRequest('/api/gpt/ask', { question: keyword });

                    if (response.status === 200) {
                        setComment(response.data.choices[0].message.content);
                        console.log('totalToken', response.data.usage.total_tokens)
                        setCopyMessage('복사하기');
                    }
                } catch (error) {
                    console.error(error);
                    alert(error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchData();
    }, [keyword]);
    
    return (
        <div className="mtb1 pointer">
            <img style={{ width: '100px' }} onClick={openModal} src={gptLarge} />
            {isModalOpen && (
                <div className="blackModal">
                    <div className="preview">

                        <div className='flex spaceBetween mb1'>
                            <img className='profile40' style={{ backgroundColor: 'white', padding: '2px' }} src={gptSmall} />
                            <h4 className='mtbAuto'>gpt-3.5-turbo 도움 받기</h4>
                            <i style={{ fontSize: "1.25rem", color: "var(--color-black)" }} className="bi bi-x-circle pointer" onClick={closeModal}></i>
                        </div>

                        <hr />

                        <div className='flex mtb1'>
                            <button onClick={() => handleBtn(1)} className={`mr05 ${state === 1 ? 'blueButton' : ''}`}>주제 선정</button>
                            <button onClick={() => handleBtn(2)} className={`mr05 ${state === 2 ? 'blueButton' : ''}`}>기사 작성</button>
                            <button onClick={() => handleBtn(3)} className={state === 3 ? 'blueButton' : ''}>문장 교정</button>
                        </div>

                        <div>
                            <div className='flex mt1'>
                                <img className='profile40 mr1' src={authorImg || profileIcon} alt="User" />
                                {state === 1 && (<div className='flex1 mtbAuto pd10'>기사 주제 추천해줘.</div>)}
                                {state === 2 && (
                                    <div className='flex1 mtbAuto pd10'>
                                        <div className='flex'>
                                            <input
                                                type="text"
                                                placeholder="키워드 1"
                                                value={keyword1}
                                                onChange={handleKeyword1Change}
                                            />
                                            <input
                                                type="text"
                                                placeholder="키워드 2"
                                                value={keyword2}
                                                onChange={handleKeyword2Change}
                                            />
                                            <input
                                                type="text"
                                                placeholder="키워드 3"
                                                value={keyword3}
                                                onChange={handleKeyword3Change}
                                            /></div>
                                            <div className='pd10'>이 내용이 포함되도록 기사 작성해줘.</div>
                                    </div>)}
                                    {state === 3 && (
                                    <div className='flex1 mtbAuto pd10'>
                                        <div className='flex'>
                                            "<input
                                                type="text"
                                                placeholder="교정이 필요한 문장을 작성해 보세요..."
                                                value={keyword1}
                                                onChange={handleKeyword1Change}
                                            />"</div>
                                            <div className='pd10'>이 문장 교정해줘.</div>
                                    </div>)}
                                {!comment && (
                                    <i onClick={handleGenerateClick} className="bi bi-arrow-up-circle-fill hoverBlack" style={{ fontSize: '24px', cursor: 'pointer' }}></i>)}
                            </div>
                            <div className='flex mt1'>

                                {comment && (
                                    <img className='profile40 mr1' style={{ backgroundColor: 'white', padding: '2px' }} src={gptSmall} />
                                )}

                                {!isLoading ? (
                                    <div>
                                        <div className='pd10' style={{
                                            wordWrap: 'break-word',
                                            wordBreak: 'break-word'
                                        }}>{comment}</div>
                                    </div>

                                ) : (
                                    <div className="flex column align-items-center flex1">
                                        <div className="spinner-border" role="status" aria-hidden="true" />
                                        <div className='mt1'>답변을 생성하는 중입니다...</div>
                                    </div>
                                )}

                                {comment && (
                                    <small className='hoverGray mlAuto wsNowrap' onClick={handleCopyClick}>{copyMessage}</small>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GPTEditor;
