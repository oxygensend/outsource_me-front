import {JobOfferForm} from "../../Components/Forms/JobOfferForm";
import React, {useEffect, useState} from "react";
import {getData} from "../../services/utils";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";
import './index.css'

export const NewJobOffer = () => {

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
        return authAxios.post(API_URL + '/job_offers', data);
    }

    const afterSubmit = (data) => {
        window.location.href = '/profile/me/twoje-owerty';
    }
    return (
        <div className={"applications-wrapper pt-4"}>

            <p className={"text-2xl pb-2 pl-1 mb-2 text-center"}>Tworzenie nowej oferty</p>
            <hr className={" mt-2 "} style={{backgroundColor: "#0F528B", opacity: "0.8"}}/>

            <div className={"new-job-form-wrapper "}>

                <JobOfferForm
                    employmentOptions={formOfEmployments}
                    workTypeOptions={workTypes}
                    buttonName={"Publikuj"}
                    request={request}
                    afterSubmit={afterSubmit}
                />
            </div>
        </div>
    );
}