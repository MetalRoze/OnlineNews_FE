import React from 'react';
import Label from '../../components/Label';
import {convertUserGradeNumToKor} from '../../utils/convertUserGrade';

export default function AdminRequest({ request }) {
    console.log(request);
    return (
        <div className='desktop-request pd10 aiCenter'>
            <div className='flex spaceBetween mb1' style={{ width: '100%' }}>
                <div className='flex' style={{gap:'0.5rem'}}>
                    <p className='m0'>{request.userName} 기자</p>
                    {convertUserGradeNumToKor(request.userGrade) === '시민기자' && <Label text="시민" />}
                </div>
                <p className='m0'>{request.createdAt.split("T")[0]}</p>
            </div>
            <h4 className='ellipsis'>{request.requestTitle===null? "아무말이나 하고 있습니다. 지금 db에는 아무 requestTitle이 없어서 너무 못생겼습니다.": request.requestTitle}</h4>
        </div>
    );
}