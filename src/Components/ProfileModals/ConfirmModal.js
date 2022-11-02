import {ModalWrapper} from "./ModalWrapper";
import React from "react";
import {Button} from "../Button/Button";
import {useParams} from "react-router-dom";

export const ConfirmModal = ({
                                 onDeclineClick,
                                 onAgreeClick,
                                 setShowModals,
                                 content,
                                 declineButtonValue,
                                 confirmButtonValue,
                                 prop
                             }) => {

    const {id} = useParams();


    return (
        <ModalWrapper
            title={"Pokaż, że jesteś otwarty na nowe zlecenia!"}
            setShowModals={setShowModals}
            prop={prop}
            type={"info"}
        >
            <p>{content}</p>

            <div className={"flex flex-row justify-between"}>

                <Button
                    className={"outsourceme_button outsource_takeOn"}
                    onClick={() => {
                        onAgreeClick()
                    }}
                    value={confirmButtonValue}
                />

                <Button
                    className={"outsourceme_button outsource_takeOff2"}
                    onClick={() => onDeclineClick()}
                    value={declineButtonValue}
                />
            </div>
        </ModalWrapper>
    );

}