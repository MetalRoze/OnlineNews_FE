import React from 'react';
import styled from 'styled-components';
import Label from '../../components/Label';

export default function Notification({ notiType, userName, message, comment, createdAt, width }) {
  const { label } = getNotificationDetails({ notiType });
  return (
    <div className='desktop-item pd10 aiCenter jcCenter' style={{ width: width }}>
      <div className='flex column jcCenter' style={{ width: '100%' }}>
        <div className='flex spaceBetween mb05 aiCenter'>
          <Label text={label} color={'white'} backgroundcolor={'black'} />
          <small className='m0'>{createdAt.split('T')[0]}</small>
        </div>
        <div className='flex mb05 aiCenter'>
          <h5 className='mr05 m0'>{userName}</h5>
        </div>
        <p className='m0'>{message}</p>
        {comment && <p className='m0' style={{ color: 'black' }}>{comment}</p>}
      </div>
    </div>
  );
}
const getNotificationDetails = ({ notiType }) => {
  switch (notiType) {
    case 'REPORTER_COMMENT':
      return {
        label: '댓글',
      };
    case 'REPORTER_LIKE':
    case 'USER_LIKE':
      return {
        label: '좋아요'
      };
    case 'USER_REPLY':
      return {
        label: '대댓글'
      };
    case 'REQUEST':
      return {
        label: '승인'
      };
    default:
      return {
        label: '알림'
      };
  }
};