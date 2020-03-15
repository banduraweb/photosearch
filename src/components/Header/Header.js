import React, {  useState } from 'react';
import { Layout, Breadcrumb, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {searchQuery, LoadData, resetPhotoList, resetPageNumber} from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {
    const query = useSelector(state=>state.query);
    const pageNumber = useSelector(state=>state.page);
    const dispatch = useDispatch();
    const { Header } = Layout;
    const { Search } = Input;
    const [currentQuery, setCurrentQuery] = useState('');
    const [prevQuery, setPrevQuery] = useState('');

    console.log(pageNumber,'header');
    const loadPhotoList =  ()=>{
        setPrevQuery(query);

        if(prevQuery!==currentQuery) {
            dispatch(resetPageNumber());
           dispatch(resetPhotoList());


           dispatch(LoadData(query,pageNumber))
       }

    };

    const handleQuery = ({target})=>{
        setCurrentQuery(target.value)
    };
    console.log(prevQuery,'prev');
    console.log(currentQuery,'current');
    return (
        <Header className="header">
            <div className="header__item">
                <span className="logo logo--flick">Flick</span>
                <span className="logo logo--red">r</span>
            </div>
            <Breadcrumb className="search">
                <Breadcrumb.Item>
                    <Search
                        placeholder="input search text"
                        onChange={(e)=>{dispatch(searchQuery(e));handleQuery(e)}}
                         />
                    <Button type="primary"
                            className="search__button"
                            onClick={loadPhotoList}  //dispatch(defaultCounterPage());
                            icon={<SearchOutlined />}>
                    </Button>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="header__item">
                <span className="logo logo--pixaby">Pixabay</span>
            </div>
        </Header>
    );
};

export default Header;
