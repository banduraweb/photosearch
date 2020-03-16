import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
    clearAllHistoryFetches,
    clearAllHistoryInfoFetches,
    clearCurrentDataHistoryFetches,
    clearCurrentHistoryInfoFetches,
} from '../../store/actions';

const History = () => {
    const dispatch = useDispatch();
    const historyInfo = useSelector(state => state.historyInfo);
    const historyData = useSelector(state => state.getHistoryData);
    const [indexArrayOfSavedUrls, setIndexArrayOfSavedUrls] = useState(null);

    const columns = [
        {
            title: 'Time of request',
            dataIndex: 'request',
        },
        {
            title: 'Keyword',
            dataIndex: 'keyword',
        },
        {
            title: 'Time fetching data',
            dataIndex: 'fetching',
        },
        {
            title: 'Fetched page',
            dataIndex: 'page',
        },
        {
            title: 'Total images',
            dataIndex: 'images',
        },
        {
            title: 'Load this fetch',
            dataIndex: 'loadHistory',
        },
    ];

    const renderHistory = index => {
        setIndexArrayOfSavedUrls(index);
    };

    const data = historyInfo.map(
        (
            { currentPage, keyword, searchTime, userActionTime, itemsCount },
            idx,
        ) => ({
            key: idx,
            keyword: keyword,
            request: searchTime,
            fetching: userActionTime,
            page: currentPage,
            images: itemsCount,
            loadHistory: (
                <>
                    <Tag onClick={() => renderHistory(idx)} color="success">
                        load this fetch
                    </Tag>
                    <Tag
                        onClick={() => {
                            dispatch(clearCurrentHistoryInfoFetches(idx));
                            dispatch(clearCurrentDataHistoryFetches(idx));
                        }}
                        color="warning"
                    >
                        Clear this search
                    </Tag>
                </>
            ),
        }),
    );

    return (
        <div>
            <Tag
                onClick={() => {
                    dispatch(clearAllHistoryFetches());
                    dispatch(clearAllHistoryInfoFetches());
                }}
                color="warning"
            >
                {historyData.length === 0 ? 'no history' : 'Clear all history'}
            </Tag>
            <Table
                columns={columns}
                dataSource={data}
                size="middle"
                pagination={false}
            />
            {indexArrayOfSavedUrls !== null && (
                <div className="gallery-container">
                    {historyData[indexArrayOfSavedUrls] &&
                        historyData[indexArrayOfSavedUrls].map((photo, idx) => (
                            <figure key={idx}>
                                <img
                                    className="gallery__img"
                                    src={photo}
                                    alt={
                                        historyInfo[indexArrayOfSavedUrls]
                                            .keyword
                                    }
                                />
                            </figure>
                        ))}
                </div>
            )}
        </div>
    );
};

export default History;
