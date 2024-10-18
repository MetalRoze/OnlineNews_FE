import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container,Row,Col,Button } from 'react-bootstrap';
import backIcon from '../assets/chevron-left.svg'; 

const GoBackHeader = ({title}) => {
    const navigate = useNavigate(); 

    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <header className="mobile-back-header">
          <div className="back-icon-wrapper" onClick={() => navigate(-1)}>
            <img
              src={backIcon}
              alt="back"
            ></img>
          </div>
          <h2 className="mobile-header-title">{title}</h2>
          <div style={{width:"50px"}}></div>
          </header>
      </div>
        
    );
};

export default GoBackHeader;
