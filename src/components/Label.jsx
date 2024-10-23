import styled from 'styled-components';
export default function Label({text, color, backgroundColor}) {
    return (
         <div className='label blue taCenter' >{text}</div>
    );
}