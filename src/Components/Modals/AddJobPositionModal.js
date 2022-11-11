import {ModalWrapper} from "./ModalWrapper";
import {Search} from "../Search/Search";
import {getData, searchArray} from "../../services/utils";
import React, {useEffect, useState} from "react";
import close_icon from "../../assets/icons/close-icon.svg";
import {JobPositionForm} from "../Forms/JobPositionForm";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";

export const AddJobPositionModal = ({setShowModals}) => {

    const [formOfEmployments, setFormOfEmployments] = useState([]);

    useEffect(() => {
        return () => {

            getData('/api/form_of_employments').then(data => {
                setFormOfEmployments(data['hydra:member']);
            });

        };
    }, []);

    const request = async data => {
        return  authAxios.post(API_URL + '/job_positions', data);
    }

    return (
        <ModalWrapper
            title={"Dodaj miejce pracy"}
            prop={"jobPositions"}
            setShowModals={setShowModals}
            type={'edit'}
        >

            <JobPositionForm
                afterSubmit={() => window.location.href = '/profil/me'}
                options={formOfEmployments}
                request={request()}

            />

        </ModalWrapper>
    );

}