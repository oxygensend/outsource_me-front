import {ModalWrapper} from "./ModalWrapper";
import {getData} from "../../services/utils";
import React, {useEffect, useState} from "react";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";
import {JobOfferForm} from "../Forms/JobOfferForm";

export const EditJobOfferModal = ({setShowModals, jobOffer}) => {

    const [formOfEmployments, setFormOfEmployments] = useState([]);
    const [workTypes, setWorkTypes] = useState([]);

    useEffect(() => {
        return () => {
            Promise.all([
                getData('/api/form_of_employments'),
                getData('/api/work_types')
            ]).then(([formOfEmployments, workTypes]) => {
                setFormOfEmployments(formOfEmployments['hydra:member']);
                setWorkTypes(workTypes['hydra:member']);
            });
        };
    }, []);

    const request = async data => {
        return authAxios.patch(API_URL + '/job_offers/' + jobOffer.id, data, {
            headers: {
                "Content-Type": "application/merge-patch+json"
            }
        });
    }

    const afterSubmit = (data) => {

        window.location.href = '/profil/' + jobOffer.user.id + '/twoje-oferty/' + jobOffer.slug
        window.flash('Pomyślnie edytowano oferte pracy', 'success')

    }

    return (
        <ModalWrapper
            title={"Edytuj informacje o zleceniu"}
            prop={"editOfferModal"}
            setShowModals={setShowModals}
            type={'edit'}
        >

            <JobOfferForm
                employmentOptions={formOfEmployments}
                workTypeOptions={workTypes}
                jobOffer={jobOffer}
                buttonName={"Edytuj"}
                request={request}
                afterSubmit={afterSubmit}
            />

        </ModalWrapper>
    );

}