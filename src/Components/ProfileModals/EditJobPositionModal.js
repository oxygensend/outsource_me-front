import {ModalWrapper} from "./ModalWrapper";
import {Search} from "../Search/Search";
import {getData, searchArray} from "../../services/utils";
import React, {useEffect, useState} from "react";
import {JobPositionForm} from "../Forms/JobPositionForm";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";

export const EditJobPositionModal = ({setShowModals, jobPosition, jobPositions}) => {


    const [formOfEmployments, setFormOfEmployments] = useState([]);

    useEffect(() => {
        return () => {
            getData('/api/form_of_employments').then(companies => {
                setFormOfEmployments(companies['hydra:member']);
            });

        };
    }, []);

    const request = async data => {
        return authAxios.patch(API_URL + '/job_positions/' + jobPosition.id, data, {
            headers: {
                "Content-Type": "application/merge-patch+json"
            }
        });
    }

    const afterSubmit = (data) => {

        const index = jobPositions.indexOf(jobPosition);
        jobPositions[index] = data.data;
        setShowModals({jobPositions: false});
    }


    return (
        <ModalWrapper
            title={"Edytuj informacje o miejscu pracy"}
            prop={"jobPositions"}
            setShowModals={setShowModals}
        >

            <JobPositionForm
                company={jobPosition.company.name}
                options={formOfEmployments}
                jobPosition={jobPosition}
                buttonName={"Edytuj"}
                request={request}
                afterSubmit={afterSubmit}
            />

        </ModalWrapper>
    );

}