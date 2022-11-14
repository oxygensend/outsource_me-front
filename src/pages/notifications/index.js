import './index.css'
import {NotificationPage} from "../../Components/Notifications/NotificationPage";
import {useState} from "react";
import {ConfirmModal} from "../../Components/Modals/ConfirmModal";
import {closeModal} from "../../services/utils";
import authAxios from "../../services/authAxios";

export const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    const [selectedNotification, setSelectedNotification] = useState();
    const [showModals, setShowModals] = useState({
        deleteNotificationModal: false
    })

    const onCLickDeleteNotification = () => {

        authAxios.delete(selectedNotification['@id']).then(data => {
            let newNotifications = [...notifications];
            let index = newNotifications.indexOf(selectedNotification)
            newNotifications.splice(index, 1);
            setNotifications(newNotifications)
            closeModal('deleteNotificationModal', setShowModals);
            window.flash("Powiadomienie zostało usuniete", 'error')
        }).catch(e => {
            console.log(e);
        })

    }

    return (
        <>
            <NotificationPage
                setShowModals={setShowModals}
                setSelectedNotification={setSelectedNotification}
                notifications={notifications}
                setNotifications={setNotifications}
            />

            {showModals.deleteNotificationModal ?
                <ConfirmModal
                    title={"Powiadomienie"}
                    setShowModals={setShowModals}
                    onAgreeClick={() => onCLickDeleteNotification()}
                    onDeclineClick={() => closeModal('deleteNotificationModal', setShowModals)}
                    content={"Czy na pewno chcesz usunać to powiadomienie?"}
                    confirmButtonValue={"Tak"}
                    declineButtonValue={"Nie"}
                    prop={"deleteNotificationModal"}
                /> : null

            }
        </>


    );
}