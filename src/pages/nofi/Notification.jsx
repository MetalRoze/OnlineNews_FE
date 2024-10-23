import React from 'react';
import styled from 'styled-components';
import Label from '../../components/Label';

export default function Notification({ notiType, type, userName, title, comment, reply }) {
    const { label, roleText, message } = getNotificationDetails({ notiType, type, userName, title, comment, reply });
    return (
        <div className='desktop-item pd10 aiCenter jcCenter'>
            <div className='flex column jcCenter' style={{ width: '100%' }}>
                <div className='flex spaceBetween mb05 aiCenter'>
                    
                    <Label text={label} color={'white'} backgroundColor={'black'}/>
                    <small className='m0'>1분전</small>
                </div>
                <div className='flex mb05 aiCenter'>
                    <h5 className='mr05 m0'>{userName}{roleText}</h5>
                    {type === '시민기자' && <Label text="시민" />}
                </div>
                <p className='m0'>{message}</p>
            </div>
        </div>
    );
}
const getNotificationDetails = ({ notiType, title, comment, reply }) => {
    switch (notiType) {
      case 'commentNoti': // 일반 사용자 알림
        return {
          label: '댓글',
          roleText: ' 님',
          message: `${comment} 댓글이 달렸습니다.`,
        };
      case 'replyNoti':
        return {
          label: '대댓글',
          roleText: ' 님',
          message: `${reply} 대댓글이 달렸습니다.`,
        };
      case 'requestNoti': // 편집장 알림
        return {
          label: '승인요청',
          roleText: ' 기자',
          message: `${title} 승인요청입니다.`,
        };
      case 'enrollNoti':
        return {
          label: '기자 등록',
          roleText: ' 기자',
          message: `${title}`,
        };
      default:
        return {
          label: '알림',
          roleText: '',
          message: '알림이 도착했습니다.',
        };
    }
  };