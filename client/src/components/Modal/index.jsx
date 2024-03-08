import React, { useState } from "react";
import "./modal.css"

const Modal = ({open, onClose}) => {
    if(!open) return null;

    return (

        <div onClick={onClose} className="overlay">
            <div 
                onClick={(e) => { e.stopPropagation();}}
                className="modalContainer">
                <div>
                    {/* <Graph /> */}
                </div>
                <button 
                        className="close-modal" 
                        onClick={onClose}>
                        Close Results
                </button>
            </div>              
        </div>
    );
}

export default Modal;