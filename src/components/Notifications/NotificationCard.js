import close_icon from '../../assets/icons/trashcan.png';
import { onClickShowModal } from '../../services/utils';
import moment from 'moment/moment';
import authAxios from '../../services/authAxios';
import TokenService from '../../services/tokenService';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

export const NotificationCard = ({ setShowModals, setSelectedNotification, notification }) => {
    const [reload, setReload] = useState();
    const { id } = TokenService.getUser();

    useEffect(() => {
        setReload(false);
    }, [reload]);

    const onClickDelete = () => {
        onClickShowModal('deleteNotificationModal', setShowModals);
        setSelectedNotification(notification);
    };

    const onMouseEnterMarkSeen = () => {
        if (notification.displayedAt) return;

        authAxios.post('api/users/' + id + '/notifications/' + notification.id + '/mark_seen', {}).then((response) => {
            notification.displayedAt = response.data.displayedAt;
            setTimeout(() => setReload(true), 500);
        });
    };

    return (
        <div
            className={
                'notification-card  cursor-default  delay-75 ' +
                (!notification.displayedAt ? 'notification-unseen' : 'notification-seen')
            }
            onMouseEnter={() => onMouseEnterMarkSeen()}
        >
            <div>
                <p className={'text-sm sm:text-base'}>{parse(notification.content)}</p>
            </div>
            <div className={'ml-2'}>
                <p className={'date-font'}>{moment(notification.createdAt).fromNow()}</p>
                <img
                    src={close_icon}
                    className={'mb-1 mt-1 cursor-pointer relative left-10'}
                    alt={'delete'}
                    onClick={() => onClickDelete()}
                />
            </div>
        </div>
    );
};
