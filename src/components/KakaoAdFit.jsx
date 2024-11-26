import React from "react";
import styled from "styled-components";

export class AdfitBannerAd extends React.Component {
    // 클래스 인스턴스를 초기화하고 초기 상태를 설정
    constructor(props) {
        super(props);
    }

    // 렌더링을 다시할지 여부를 결정하는 라이프사이클 메서드
    shouldComponentUpdate() {
        // 업데이트되지 않고 이전 렌더링 결과를 사용
        return false;
    }

    componentDidMount() {
        // Kakao 광고 스크립트와 인스턴스를 동적으로 생성
        let ins = document.createElement('ins');
        let scr = document.createElement('script');

        ins.className = 'kakao_ad_area';
        ins.setAttribute('style', 'display: none;');
        scr.async = true;
        scr.type = 'text/javascript';
        scr.src = '//t1.daumcdn.net/kas/static/ba.min.js';

        // 광고 사이즈 및 유닛 설정
        ins.setAttribute('data-ad-width', '320');
        ins.setAttribute('data-ad-height', '100');
        ins.setAttribute('data-ad-unit', 'DAN-2LQytWC5DIiifh3N'); // 광고 코드 부분 수정

        // 광고를 삽입할 부모 요소 찾기
        let parent = document.getElementById('adFit');
        if (parent) {
            parent.appendChild(ins);
            parent.appendChild(scr);
        }
    }

    render() {
        return <BannerAd id="adFit" />;
    }
}

const BannerAd = styled.div`
  width: 100%;
  margin-top: 50px;
  text-align: center; /* 중앙 정렬 */
`;

export default AdfitBannerAd;
