import {EditModal} from "./EditModal";
import React, {useState} from "react";
import {AddLanguageForm} from "../Forms/AddLanguageForm";

export  const AddLanguagesModal = ({universitiesList, setShowModals}) => {


    return (
        <EditModal
            title={"Dodaj język"}
            setShowModals={setShowModals}
            prop={"languages"}
        >
            <AddLanguageForm/>
        </EditModal>
    );

}