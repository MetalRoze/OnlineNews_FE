import React, { useState, useEffect } from 'react';
import SubscriptionModal from './SubscriptionModal';
import KakaoShare from '/src/utils/KakaoShare.jsx';



const ArticleContent = () => {
    const [articleLikeCount, setArticleLikeCount] = useState(0);
    const [isArticleLiked, setIsArticleLiked] = useState(false);
    const [isEmailSubscribed, setIsEmailSubscribed] = useState(true);


    const [articleTitle, setArticleTitle] = useState("Lorem ipsum dolor sit amet adipisicing elit.");
    const [articleDate, setArticleDate] = useState("입력 yyyy.mm.dd 오전 hh:mm");
    const [authorName, setAuthorName] = useState("홍길동");
    const [authorEmail, setAuthorEmail] = useState("hong@yu.com");
    const [publisherUrl, setPublisherUrl] = useState("www.yu.ac.kr");
    const [authorDescription, setAuthorDescription] = useState("간단 한줄 소개문구입니다.");
    const [articleSubtit, setArticleSubtit] = useState("Lorem, ipsum dolor sit amet consectetur.,./소제목2,./소제목3");
    const [subTitles, setSubTitles] = useState([]);
    const [articleContent, setArticleContent] = useState([
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus minima, cupiditate asperiores reiciendis repellat fugiat at tenetur voluptatibus quam aut tempora nam officiis autem!",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus minima, cupiditate asperiores reiciendis repellat fugiat at tenetur voluptatibus quam aut tempora nam officiis autem!",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus minima, cupiditate asperiores reiciendis repellat fugiat at tenetur voluptatibus quam aut tempora nam officiis autem!",
        "https://placehold.co/300x200",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus minima, cupiditate asperiores reiciendis repellat fugiat at tenetur voluptatibus quam aut tempora nam officiis autem!",
    ]);

    useEffect(() => {
        const splitSubtitles = articleSubtit.split(',./').map(sub => sub.trim()).filter(sub => sub !== "");
        setSubTitles(splitSubtitles);
    }, [articleSubtit]);

    const handleArticleLikeToggle = () => {
        setIsArticleLiked(prevState => {
            const newState = !prevState;
            setArticleLikeCount(prevCount => newState ? prevCount + 1 : prevCount - 1);
            return newState;
        });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscriptionToggle = () => {
        setIsModalOpen(true);
    };

    const handleSubscribe = () => {
        setIsSubscribed(true);
        setIsModalOpen(false);
    };

    const handleUnsubscribe = () => {
        setIsSubscribed(false);
        setIsModalOpen(false);
    };
    const handleEmailSubscribe = () => {
        setIsEmailSubscribed(true);
        setIsModalOpen(false);
    };

    const handleEmailUnsubscribe = () => {
        setIsEmailSubscribed(false);
        setIsModalOpen(false);
    };
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);


    return (
        <div>
            <div>
                <img src="https://placehold.co/130x50" alt="Bootstrap" />
                <h1 className='mt1'>{articleTitle}</h1>
                <small className='mt1 gray40'>{articleDate}</small>
                <div className='mt1 taRight'>
                    <p className='mr1 inline'>{authorName} 기자</p>
                    <img className='br50' src="https://placehold.co/50x50" alt="Author" />
                </div>
            </div>
            <hr style={{ margin: '1rem 0' }} />
            <div>
                {/* 소제목 배열을 출력 */}
                {subTitles.map((subtitle, index) => (
                    <h2 className='articleSubtitle' key={index}>{subtitle}</h2>
                ))}
                <br />
                {articleContent.map((content, index) => (
                    <div key={index}>
                        {typeof content === 'string' && content.startsWith('http') ? (
                            <img src={content} alt="본문 이미지" />
                        ) : (
                            <p>{content}</p>
                        )}
                        <br />
                    </div>
                ))}
            </div>

            <div className='mt1 flex'>
                <img src="https://placehold.co/130x50" alt="Bootstrap" />
                <div className='mlAuto'>
                    <p className='m0'>{authorName} 기자 {authorEmail}</p>
                    <small className='gray40'>{authorDescription}</small>
                </div>
            </div>
            <a className='gray40 mt1'>{publisherUrl} &gt;</a>
            <button
                className={`mt2 ${isSubscribed ? 'unsubsButton' : 'subsButton'}`}
                onClick={() => {
                    if (isSubscribed) {
                        handleSubscriptionToggle();
                    } else {
                        handleSubscribe();
                    }
                }}
            >
                {isSubscribed && isEmailSubscribed !== null && (
                    <i className={`bi ${isEmailSubscribed ? 'bi-envelope-check' : 'bi-envelope-x-fill'}`}></i>
                )}
                &nbsp;{isSubscribed ? '구독중' : '구독'}
            </button>

            <hr className='mt1' style={{ margin: '1rem 0' }} />

            <div className='flex'>
                <div>
                    <i
                        className={`bi block taCenter ${isArticleLiked ? 'bi-heart-fill blue' : 'bi-heart'}`}
                        onClick={handleArticleLikeToggle}
                    ></i>
                    <small className='taCenter block'>{articleLikeCount}</small>
                </div>
                <KakaoShare title={articleTitle} content={articleSubtit} link="articleDetail" THU="http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png" />
            </div>

            <SubscriptionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onEmailSubscribe={handleEmailSubscribe}
                onEmailUnsubscribe={handleEmailUnsubscribe}
                onUnsubscribe={handleUnsubscribe}
            />

        </div>
    );
};

export default ArticleContent;
