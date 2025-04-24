import React from 'react';
import SmartAnswerBuilder from '../../components/SmartAnswerBuilder';

import style from './style.module.css';

/**
 * Main Smart Answer components
 */
const SmartAnswer = () => {
    return (
        <div className={style.smartAnswerContainer}>
            <SmartAnswerBuilder/>
        </div>
    )
}

export default SmartAnswer;
