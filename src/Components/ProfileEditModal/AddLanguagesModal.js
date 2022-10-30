import {EditModal} from "./EditModal";
import React, {useState} from "react";
import {AddLanguageForm} from "../Forms/AddLanguageForm";

export const AddLanguagesModal = ({universitiesList}) => {


    return (
        <EditModal
            title={"Dodaj język"}
        >
            <AddLanguageForm/>
        </EditModal>
    );

}