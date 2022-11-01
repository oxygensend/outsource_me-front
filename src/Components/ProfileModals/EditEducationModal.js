import {ModalWrapper} from "./ModalWrapper";
import {Search} from "../Search/Search";
import {getData, searchArray} from "../../services/utils";
import React, {useEffect, useState} from "react";
import {JobPositionForm} from "../Forms/JobPositionForm";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";
import {EducationForm} from "../Forms/EducationForm";

export const EditEducationModal = ({setShowModals, selectedEducation, education}) => {

    const request = async data => {
        return authAxios.patch(API_URL + '/education/' + selectedEducation.id, data, {
            headers: {
                "Content-Type": "application/merge-patch+json"
            }
        });
    }

    const afterSubmit = (data) => {

        const index = education.indexOf(selectedEducation);
        education[index] = data.data;
        setShowModals({education: false});
    }

    return (
        <ModalWrapper
            title={"Edytuj uczelnię "}
            prop={"education"}
            setShowModals={setShowModals}
        >

            <EducationForm
                education={selectedEducation}
                buttonName={"Edytuj"}
                request={request}
                afterSubmit={afterSubmit}
            />

        </ModalWrapper>
    );

}