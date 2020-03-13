import React from 'react';
import { Modal } from 'antd';

function info() {
    Modal.info({
        title: 'Info message',
        content: (
            <div className="modal">
                <p>This service help you to look for different photos</p>
                <p>
                    fetched from
                    <br/>
                    <span className="logo-flickr">Flic</span>
                    <span className="logo-flickr-r">r</span>
                    {" "}&&{" "}
                    <span className="logo-pixaby">Pixabay</span>
                </p>
            </div>
        ),
        onOk() {},
    });
}

export default info;
