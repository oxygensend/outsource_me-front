import { NotificationCard } from './NotificationCard';
import { getData } from '../../services/utils';
import { useEffect, useState } from 'react';
import TokenService from '../../services/tokenService';
import InfiniteScroll from 'react-infinite-scroller';
import loader from '../../assets/images/loader.gif';

export const NotificationPage = ({ setShowModals, setSelectedNotification, notifications, setNotifications }) => {
    const [totalNumberOfItems, setTotalNumberOfItems] = useState();
    const [hasMore, setHasMore] = useState(false);
    const  id  = TokenService.getUserId;
    const [currentPaginationUrl, setCurrentPaginationUrl] = useState(
        '/api/users/' + id + '/notifications?order[createdAt]=desc',
    );

    useEffect(() => {
        return () => {
            getNotifications();
        };
    }, []);

    const getNotifications = (clear = false) => {
        getData(currentPaginationUrl)
            .then((response) => {
                if (response !== undefined) {
                    const incomingData = response['hydra:member'];

                    setCurrentPaginationUrl(response['hydra:view']['hydra:next']);
                    setTotalNumberOfItems(response['hydra:totalItems']);

                    if (!response['hydra:view']['hydra:next']) {
                        setHasMore(false);
                    } else {
                        setHasMore(true);
                    }

                    if (clear === true) {
                        setNotifications(incomingData);
                        return;
                    }

                    const items = [...notifications, ...incomingData];
                    setNotifications(items);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={'notification-container full-height '}>
            <InfiniteScroll
                pageStart={1}
                loadMore={getNotifications}
                hasMore={hasMore}
                loader={<img src={loader} alt={'loader'} className={'loader'} key={-1} width={40} height={40} />}
                useWindow={true}
            >
                {notifications.length > 0 ? (
                    notifications.map((notification, i) => {
                        return (
                            <NotificationCard
                                setShowModals={setShowModals}
                                setSelectedNotification={setSelectedNotification}
                                notification={notification}
                                key={i}
                            />
                        );
                    })
                ) : (
                    <p className={'text-center font-info relative top-20'}>Brak powiadomień</p>
                )}
            </InfiniteScroll>
        </div>
    );
};
