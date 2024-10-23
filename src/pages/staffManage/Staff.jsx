import React from 'react';
import styled from 'styled-components';
import Label from '../../components/Label';

export default function Staff({ type, staffName, address, phoneNumber }) {

    return (
        <div className='desktop-item pd10 aiCenter jcCenter'>
            <img src="https://placehold.co/100x100" className='br10 mr05' />
            <div className='flex column jcCenter' style={{ width: '75%' }}>
                <div className='flex mb05 aiCenter'>
                    <h5 className='mr05 m0'>{staffName} 기자</h5>
                    {type === '시민기자' ? (<Label text={'시민'} />) : null}
                </div>
                <div className='flex jcCenter mr1' >
                    <i className="bi bi-envelope mr05"></i>
                    <small className='m0 ellipsis'>{address}</small>
                </div>
                <div className='flex jcCenter'>
                    <i className="bi bi-telephone mr05"></i>
                    <small className='m0 ellipsis'>{phoneNumber}</small>
                </div>
            </div>
        </div>
    );
}
