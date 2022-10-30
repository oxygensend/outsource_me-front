import {AddModal} from "./AddModal";
import React, {useState} from "react";
import {AddLanguageForm} from "../Forms/AddLanguageForm";

export  const AddLanguagesModal = ({universitiesList, setShowModals}) => {


    return (
        <AddModal
            title={"Dodaj język"}
            setShowModals={setShowModals}
            prop={"languages"}
        >
            <AddLanguageForm/>
        </AddModal>
    );

}