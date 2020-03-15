import React, { memo } from 'react';
import { Button, Layout } from 'antd';
import Info from '../Modal/Modal';
import {useDispatch, useSelector} from "react-redux";
import { LoadData } from "../../store/actions";


const Footer = () => {
    const query = useSelector(state=>state.query);
    const dispatch = useDispatch();

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
            <button >LOAD MORE</button>
{/*onClick={()=>{dispatch(LoadData(query,2))}}*/}
        </Footer>
    );
};

export default memo(Footer);
