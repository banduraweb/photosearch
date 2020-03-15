import React, { useState, memo } from 'react';
import { Layout, Breadcrumb, Input, Button, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
    searchQuery,
    LoadData,
    resetPhotoList,
    resetPageNumber,
} from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
    const query = useSelector(state => state.query);
    const time = useSelector(state => state.time);
    const list = useSelector(state => state.photoList);
    const history = useSelector(state => state.history);
    const pageNumber = useSelector(state => state.page);
    const dispatch = useDispatch();
    const { Header } = Layout;
    const { Search } = Input;
    const [currentQuery, setCurrentQuery] = useState('');
    const [prevQuery, setPrevQuery] = useState('');

    console.log(history);
    const loadPhotoList = () => {
        setPrevQuery(query);
        if (prevQuery !== currentQuery && query !== '') {
            dispatch(resetPhotoList());
            dispatch(LoadData(query, pageNumber));
        }
    };

    const handleQuery = ({ target }) => {
        dispatch(resetPageNumber());
        setCurrentQuery(target.value);
    };

    const onEnterKey = e => {
        if (e.key === 'Enter' && query !== '') {
            loadPhotoList();
        }
    };

    return (
        <Header className="header">
            {list.length > 0 && (
                <div className="header__item header__item--info header__item--hover">
                    <span>
                        <Tag
                            title="you can see you search history"
                            color="success"
                            className="header__item--hover"
                        >
                            history search
                        </Tag>
                    </span>
                </div>
            )}
            <div className="header__item">
                <span className="logo logo--flick">Flick</span>
                <span className="logo logo--red">r</span>
            </div>
            <Breadcrumb className="search">
                <Breadcrumb.Item>
                    <Search
                        placeholder="input search text"
                        onChange={e => {
                            dispatch(searchQuery(e));
                            handleQuery(e);
                        }}
                        onKeyPress={e => {
                            onEnterKey(e);
                        }}
                    />
                    <Button
                        type="primary"
                        className="search__button"
                        onClick={loadPhotoList}
                        icon={<SearchOutlined />}
                    />
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="header__item">
                <span className="logo logo--pixaby">Pixabay</span>
            </div>
            {list.length > 0 && (
                <div className="header__item header__item--info">
                    <span>
                        <Tag title="spend time to load img" color="success">
                            {' '}
                            fetched time: {time}
                        </Tag>
                    </span>
                </div>
            )}
        </Header>
    );
};

export default memo(Header);
