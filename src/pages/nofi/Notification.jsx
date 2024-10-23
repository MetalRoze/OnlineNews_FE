import React from 'react';
import styled from 'styled-components';
import Label from '../../components/Label';

export default function Notification({ type, userName, title, comment }) {

    return (
        <div className='desktop-item pd10 aiCenter jcCenter'>
            <div className='flex column jcCenter' style={{ width: '100%' }}>
                <div className='flex spaceBetween mb05 aiCenter'>
                    
                    <Label text={type=='일반'?'댓글':'승인요청'} color={'white'} backgroundColor={'black'}/>
                    <small className='m0'>1분전</small>
                </div>
                <div className='flex mb05 aiCenter'>
                    <h5 className='mr05 m0'>{userName}</h5>
                    {type === '시민기자' ? (<Label text={'시민'} />) : null}
                </div>
                <p className='m0'>{title} {type==='일반'?'댓글':'승인요청'}입니다.</p>
            </div>
        </div>
    );
}
