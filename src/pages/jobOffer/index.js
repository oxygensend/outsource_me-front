import React, {useEffect, useState} from "react";
import {JobOfferView} from "../../Components/JobOfferView/JobOfferView";
import './index.css';
import {ApplicationBox} from "../../Components/JobOfferView/ApplicationBox";
import {useParams} from "react-router-dom";
import {getData, getDataAuthentication} from "../../services/utils";

export const JobOffer = () => {

    const {slug} = useParams();
    const [jobOffer, setJobOffer] = useState();

    useEffect(() => {
        return () => {
            getData('/api/job_offers/' + slug).then(jobOffer => setJobOffer(jobOffer))
        };
    }, []);


    if (jobOffer) {

        return (

            <div className={""}>
                <JobOfferView
                    jobOffer={jobOffer}
                />
                <ApplicationBox
                    jobOffer={jobOffer}
                />
            </div>
        );
    } else {
        return null;
    }
}