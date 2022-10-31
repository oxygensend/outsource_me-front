import {AddModal} from "./AddModal";
import React, {useState} from "react";
import {EditProfileDescriptionForm} from "../Forms/EditProfileDescriptionForm";

export const EditDescriptionModal = ({setShowModals, personalData}) => {

    if (personalData) {

        return (
            <AddModal
                title={"O mnie"}
                setShowModals={setShowModals}
                prop={"description"}
            >
                <EditProfileDescriptionForm personalData={personalData}/>
            </AddModal>
        );

    } else {
        return null;
    }
}