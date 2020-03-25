import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Welcome from './components/Welcome/Welcom';
import { LoadData } from './store/actions';
import History from './components/Histoty/History';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'antd';

import './styles/main.scss';
import CurrentImg from './components/CurrentImg/CurrentImg';

const App = () => {
    const list = useSelector(state => state.photoList);
    const query = useSelector(state => state.query);
    const pageNumber = useSelector(state => state.page);
    const isActiveHistoryBtn = useSelector(state => state.isActiveHistoryBtn);

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
            ) : !isActiveHistoryBtn ? (
                <InfiniteScroll
                    pageStart={pageNumber}
                    loadMore={onScroll}
                    hasMore={true}
                    threshold={100}
                >
                    <div className="gallery-container ">
                        {list.map((photo, idx) => (
                            <figure key={idx}>
                                <CurrentImg photo={photo} alt={query} />
                            </figure>
                        ))}
                    </div>
                </InfiniteScroll>
            ) : (
              <div className="history">
                <History />
              </div>
            )}

            <Footer />
        </Layout>
    );
};

export default App;
