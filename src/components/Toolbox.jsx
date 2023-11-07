import React from 'react';
import '../assets/styles/toolbox.css';

export default function Toolbox(props) {

    function handleChangeStyle(sentStyle) {
        let propName = "";
        let propVal = "";
        for (const prop in sentStyle) {
            propName = prop;
            propVal = sentStyle[prop];
        }
        props.setStyle((prev) => ({
            ...prev,
            [propName]: propVal,
        }))
    }

    return (
        <section className="toolbox-container">
            <div 
                onClick={() => {handleChangeStyle({fontWeight: "bolder"})
                                props.handleToolboxBtnClick()
                }}
                className="toolbox-btn"    
            >Bold</div>
            <div
                onClick={() => handleChangeStyle({fontSize: props.style.fontSize - 0.1})}
                className="toolbox-btn"
            >Smaller Font</div>
            <div
                onClick={() => handleChangeStyle({fontSize: props.style.fontSize + 0.1})}
                className="toolbox-btn"
            >Larger Font</div>
        </section>
    )
}