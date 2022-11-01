import {ModalWrapper} from "./ModalWrapper";
import {Search} from "../Search/Search";
import {getData, getDataAuthentication, searchArray} from "../../services/utils";
import React, {useEffect, useState} from "react";
import close_icon from "../../assets/icons/close-icon.svg";
import {AddEducationForm, EducationForm} from "../Forms/EducationForm";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";

export const AddExpirienceModal = ({setShowModals}) => {

    const request = async data => {
        return authAxios.post(API_URL + '/education', data);
    }


    return (
        <ModalWrapper
            title={"Dodaj wykształcenie"}
            setShowModals={setShowModals}
            prop={"education"}
        >


            <EducationForm
                request={request()}
                afterSubmit={() => window.location.href = '/profil/me'}
            />

        </ModalWrapper>
    );

}