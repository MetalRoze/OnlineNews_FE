import React from 'react';
import Label from '../../components/Label';
import styled from 'styled-components';
import { convertUserGradeNumToKor } from '../../utils/convertUserGrade';
import { useNavigate } from 'react-router-dom';
import { getNotificationDetails } from '../../utils/getNotificationDetails';

export default function AdminRequest({ request, pathTo, width }) {
    const navigate = useNavigate();
    const type = request.type;
    const userGrade = request.userGrade;
    const { label } = getNotificationDetails({ type });

    const navigateToPath = (pathTo) => {
        console.log(pathTo);
        navigate(pathTo);
    };

    return (
        <div className='desktop-item pd10 aiCenter jcCenter' onClick={() => navigateToPath(pathTo)} style={{ width: width }}>
            <div className='flex column jcCenter' style={{ width: '100%' }}>
                <div className='flex spaceBetween mb05 aiCenter'>
                    <div className='flex' style={{gap:'0.5rem'}}>
                        <Label text={label} color={'white'} backgroundcolor={'black'} />
                        {convertUserGradeNumToKor(userGrade) === '시민기자' && <Label text={'시민'} color={'blue'} backgroundcolor={'blueOp'} />}
                    </div>
                    <small className='m0'>{request.createdAt.split('T')[0]}</small>
                </div>
                <div className='flex mb05 aiCenter'>
                    <h5 className='mr05 m0'>{request.userName}</h5>
                </div>
                <p className='m0'>{request.requestTitle}</p>
            </div>
        </div>
    );
}
const StyledArticleContentWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1.5fr;
    justify-items: flex-start;
`;