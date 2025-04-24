import React from 'react'
import ReactDOM from 'react-dom';
import style from './style.module.css';

const Portal = (props) => {
    return (
        ReactDOM.createPortal(
            <div className={style.portalContainer}>{props.children }</div>,
            document.getElementById('flow-portal')
        )
    )
}

export default Portal
