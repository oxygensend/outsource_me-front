import close_icon from "../../assets/icons/trashcan.png";
import {onClickShowModal} from "../../services/utils";

export const NotificationCard = ({setShowModals}) => {

    return (
        <div
            className={"notification-card hover:bg-gray-100 cursor-default  delay-75 " + (1 ? 'notification-unseen' : 'notification-seen')}>

            <div>
                <p>Cll help us to build the future for Precima's embedded analytics platform. This is a highly technical
                    position in an exciting new development area we will be introducing</p>
            </div>
            <div>
                <p className={"date-font"}>32 min</p>
                <img src={close_icon}
                     className={"mb-1 mt-1 cursor-pointer ml-2"}
                     alt={"delete"}
                     onClick={() => onClickShowModal('deleteNotificationModal', setShowModals)}
                />
            </div>
        </div>
    );
}