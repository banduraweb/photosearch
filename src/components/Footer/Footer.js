import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Layout, Tag } from 'antd';
import Info from '../Modal/Modal';

const Footer = () => {
    const { Footer } = Layout;
    const availablePhotos = useSelector(state => state.availablePhotos);
    const list = useSelector(state => state.photoList);
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
            {availablePhotos > 0 && (
                <Tag className="footer__total" color="#108ee9">
                    available photos: {availablePhotos - list.length}
                </Tag>
            )}
        </Footer>
    );
};

export default Footer;
