import {ModalWrapper} from "./ModalWrapper"; import React, {useState} from "react";
import {LanguageForm} from "../Forms/LanguageForm";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";

export  const AddLanguagesModal = ({universitiesList, setShowModals}) => {


    const request = async data => {
        return  authAxios.post(API_URL + '/languages', data);
    }

    return (
        <ModalWrapper
            title={"Dodaj język"}
            setShowModals={setShowModals}
            prop={"languages"}
        >
            <LanguageForm
                afterSubmit={ () => { window.location.href = '/profil/me' }}
                request={request}
            />
        </ModalWrapper>
    );

}