import React from 'react';

export default function Modal(props) {

    return (
        <div className='modal-background'>
            <div className="modal">
                <p className="modal-text">{props.text}</p>
                {!props.includeGoBackBtn && <button 
                    onClick={() => {
                            props.setPage(props.goToPage);
                            props.setShowModal(false);
                            if (props.modalFunction) props.modalFunction(props.modalFunctionValue);
                        }
                    }
                    className="modal-btn post-page-btn"
                >Confirm</button>}
                {props.includeGoBackBtn && <div className="modal-button-container">
                    <button
                        className="post-page-btn"
                        onClick={() => {
                            props.setShowModal(false);
                        }}>Go Back</button>
                    <button
                        className="post-page-btn"
                        onClick={() => {
                            props.modalFunction(props.modalFunctionValue);
                        }}>Continue</button>
                </div>}
            </div>
        </div>
    )
}