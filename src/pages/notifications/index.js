import './index.css'
import close_icon from "../../assets/icons/trashcan.png";
import {NotificationCard} from "../../Components/Notifications/NotificationCard";
import {NotificationPage} from "../../Components/Notifications/NotificationPage";
import {useState} from "react";
import {ConfirmModal} from "../../Components/Modals/ConfirmModal";
import {closeModal} from "../../services/utils";
export const Notifications = () => {

    const [showModals, setShowModals] = useState({
        deleteNotificationModal: false
    })

    return (
       <>
           <NotificationPage setShowModals={setShowModals}/>

           {showModals.deleteNotificationModal ?
               <ConfirmModal
                   title={"Powiadomienie"}
                   setShowModals={setShowModals}
                   onAgreeClick={() => console.log('x')}
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