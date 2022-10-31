import {AddModal} from "./AddModal";
import {EditProfileDescriptionForm} from "../Forms/EditProfileDescriptionForm";
import React from "react";
import {EditUserPersonalInfoForm} from "../Forms/EditUserPersonalInfoForm";

export const EditPersonalInfoModal = ({personalData, setShowModals}) => {
    if (personalData) {

        return (
            <AddModal
                title={"Edytuj informacje o sobie"}
                setShowModals={setShowModals}
                prop={"personalInfo"}
            >
                <EditUserPersonalInfoForm personalData={personalData}/>
            </AddModal>
        );

    } else {
        return null;
    }

}