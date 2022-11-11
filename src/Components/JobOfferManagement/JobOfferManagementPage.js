import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {JobOfferStatistics} from "./JobOfferStatistics";
import {PrincipleApplicationCard} from "../Application/PrincipleApplicationCard";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";

export const JobOfferManagementPage = ({jobOffer, setShowModals}) => {
    const {slug} = useParams();
    const [acceptedApplications, setAcceptedApplications] = useState([]);
    const [rejectedApplications, setRejectedApplications] = useState([]);
    const [applications, setApplications] = useState([])


    useEffect(() => {
        if (jobOffer) {
            splitApplications(jobOffer.applications);
        }
    }, [jobOffer]);


    const splitApplications = (applications) => {
        setApplications(applications);
        setAcceptedApplications(applications.filter(el => el.status === 1))
        setRejectedApplications(applications.filter(el => el.status !== 1))
    }

    const onClickChangeStatus = (application, status) => {
        authAxios.post(API_URL + '/applications/' + application.id + '/change_status', {
            status
        }).then((response) => {
            const newStatus = response.data.status;
            let newApplications = [...applications];
            let index = newApplications.indexOf(application)
            newApplications[index].status = newStatus;
            splitApplications(applications);
        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <div className={"applications-wrapper"}>
            {jobOffer ?
                (
                    <div>

                        <div>

                            <JobOfferStatistics
                                jobOffer={jobOffer}
                                setShowModals={setShowModals}
                            />
                            <hr className={"col-span-full mt-6 "} style={{backgroundColor: "#0F528B", opacity: "0.8"}}/>
                        </div>

                        <p className={"text-4xl pt-2 text-center"}>Aplikacje</p>

                        <p className={"font-module mt-5 margin-l "}>{"Wszystkie (" + applications.length + ")"} </p>
                        <div className={"mt-4 flex flex-col items-center"}>
                            {applications.map((application, id) => {
                                return (
                                    <PrincipleApplicationCard
                                        application={application}
                                        onClickReject={() => onClickChangeStatus(application, -1)}
                                        onClickAccept={() => onClickChangeStatus(application, 1)}
                                        id={id}
                                    />);
                            })}
                        </div>


                        <p className={"font-module mt-5 margin-l "}>{"Zaakceptowane (" + acceptedApplications.length + ")"} </p>
                        <div className={"mt-4 flex flex-col items-center"}>
                            {acceptedApplications.map((application, id) => {
                                return (
                                    <PrincipleApplicationCard
                                        application={application}
                                        id={id}
                                        onClickReject={() => onClickChangeStatus(application, -1)}
                                        onClickAccept={() => onClickChangeStatus(application, 1)}
                                    />);
                            })}
                        </div>

                        <p className={"font-module mt-5 margin-l "}>{"Odrzucone (" + rejectedApplications.length + ")"} </p>
                        <div className={"mt-4 flex flex-col items-center"}>
                            {rejectedApplications.map((application, id) => {
                                return (
                                    <PrincipleApplicationCard
                                        application={application}
                                        id={id}
                                        onClickReject={() => onClickChangeStatus(application, -1)}
                                        onClickAccept={() => onClickChangeStatus(application, 1)}
                                    />);
                            })}
                        </div>
                    </div>
                )

                : null
            }


        </div>
    );
}