import React, { useEffect, useState } from 'react';
import { JobOfferView } from '../../components/JobOfferView/JobOfferView';
import './index.css';
import { ApplicationBox } from '../../components/JobOfferView/ApplicationBox';
import { useParams } from 'react-router-dom';
import { getData, getDataAuthentication } from '../../services/utils';
import jobOfferService from '../../services/jobOfferService';

export const JobOffer = () => {
    const { slug } = useParams();
    const [jobOffer, setJobOffer] = useState();

    useEffect(() => {
        return () => {
            getData('/job-offers/' + slug).then((jobOffer) => setJobOffer(jobOffer));
        };
    }, []);
    
    useEffect(() => {
       const visited =  JSON.parse(localStorage.getItem("visited-job-offers") ?? "[]");
       if(!visited.includes(slug)){
        console.log(slug)
            jobOfferService.addRedirect(slug)
            visited.push(slug)
            localStorage.setItem("visited-job-offers", JSON.stringify(visited))
       }
    })

    if (jobOffer) {
        return (
            <div className={''}>
                <JobOfferView jobOffer={jobOffer} />
                <ApplicationBox jobOffer={jobOffer} />
            </div>
        );
    } else {
        return null;
    }
};
