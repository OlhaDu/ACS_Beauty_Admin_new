import React from 'react';
import styles from './VioletButton.module.scss'

const VioletButton = ({buttonText, radius, onClickFunction, type, disabled}) => {
    return (
        <button type={type} className={styles.buttonContainer} style={{borderRadius: radius}} onClick={onClickFunction} disabled={disabled}>
            {buttonText}  
        </button>
    );
}

export default VioletButton;
