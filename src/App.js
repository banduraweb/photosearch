import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Welcome from './components/Welcome/Welcom';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'antd';

import './styles/main.scss';
import { LoadData } from './store/actions';

const App = () => {
    const list = useSelector(state => state.photoList);
    const query = useSelector(state => state.query);
    const pageNumber = useSelector(state => state.page);

    const dispatch = useDispatch();
    const onScroll = () => {
        if (query !== '') {
            dispatch(LoadData(query, pageNumber));
        }
    };

    return (
        <Layout className="layout">
            <Header />
            {list.length === 0 ? (
                <section className="welcome">
                    <Welcome />
                </section>
            ) : (
                <InfiniteScroll
                    pageStart={pageNumber}
                    loadMore={onScroll}
                    hasMore={true}
                    threshold={100}
                >
                    <div className="gallery-container ">
                        {list.map((photo, idx) => (
                            <figure key={idx}>
                                <img
                                    className="gallery__img"
                                    alt={query}
                                    src={photo}
                                />
                            </figure>
                        ))}
                    </div>
                </InfiniteScroll>
            )}

            <Footer />
        </Layout>
    );
};

export default App;
