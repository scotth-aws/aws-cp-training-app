import React from 'react'
const ConfigModal = props => {
    console.log('ConfigModal ' + props.show);
    if (!props.show) {
        return null;
    }
    return (
        <div clasName="modal">
            <div clasName="modal-content">
                <div clasName="modal-header">
                    <h4 clasName="modal-title">App config</h4>
                </div>
                <div clasName="modal-body">
                    <p>Enter Partner's name:</p>
                    <form>
                        <input
                            type="text"
                            onChange={props._companyChangeHandler}
                        />
                    </form>
                </div>
                <div clasName="modal-footer">
                    <button className="button" onClick={props._onClose}>Submit</button>
                </div>
            </div>
        </div>
    );

}
export default ConfigModal;