import React, { memo } from 'react';
import { Button, Layout } from 'antd';
import Info from '../Modal/Modal';

const Footer = () => {
    const { Footer } = Layout;
    return (
        <Footer className="footer">
            <span className="footer__info">Design©2020fake@fake.com</span>
            <Button
                type="primary"
                className="footer__btn-get-info"
                onClick={Info}
            >
                Get info
            </Button>
        </Footer>
    );
};

export default memo(Footer);
