import React from 'react'
import Style from './style.module.css';

const CustomPanal = ({onAddNode, onClearAll, onSave}) => {
    return (
        <div className={Style.customPanalWrapper}>
            <div className={Style.customPanal}>
                <button onClick={()=>{onAddNode()}}>Add Node</button>
                <button onClick={()=>{
                    const shouldContinue = window.confirm("Are You Sure To Clear All Data");
                    if ( shouldContinue ) {
                        onClearAll();
                    }
                }}>Clear All</button>
                <button onClick={()=>{onSave()}}>Save</button>
            </div>
            <div id="flow-portal"></div>
        </div>
    )
}

export default CustomPanal;
