import {NotificationCard} from "./NotificationCard";

export const NotificationPage = ({setShowModals}) => {
    return (
        <div className={"notification-container full-height "}>
            <NotificationCard setShowModals={setShowModals}/>

        </div>
    );
}