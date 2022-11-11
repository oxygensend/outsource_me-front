import {ModalWrapper} from "./ModalWrapper";
import React, {useState} from "react";
import {MessageForm} from "../Forms/MessageForm";

export const ContactModal = ({setShowModals, userIri, application}) => {


    return (
        <ModalWrapper
            title={"Napisz wiadomość"}
            setShowModals={setShowModals}
            prop={"messageModal"}
            type={'edit'}
        >

            <MessageForm
                application={application}
                userIri={userIri}
            />

        </ModalWrapper>
    );

}