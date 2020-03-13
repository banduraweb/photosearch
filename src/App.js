import React from 'react';
import Welcome from './components/Welcome/Welcom';
import { Layout, Breadcrumb, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import info from './servises/modal/modal';

function App() {
    const { Header, Footer } = Layout;
    const { Search } = Input;

    return (
        <Layout className="layout">
            <Header className="header">
                <div className="header-item">
                    <span className="logo-flickr">Flick</span>
                    <span className="logo-flickr-r">r</span>
                </div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>
                        <Search placeholder="input search text" enterButton />
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="header-item">
                    <span className="logo-pixaby">Pixabay</span>
                </div>
            </Header>

            <div className="welcome">
                <Welcome />
            </div>
            <Footer className="footer">
                <span className="design-info">Design©2020fake@fake.com</span>
                <Button type="primary" className="btn-get-info" onClick={info}>
                    Get info
                </Button>
            </Footer>
        </Layout>
    );
}

export default App;
