import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { JobOfferStatistics } from './JobOfferStatistics';
import { PrincipleApplicationCard } from '../Application/PrincipleApplicationCard';
import authAxios from '../../services/authAxios';
import { API_URL } from '../../config';

export const JobOfferManagementPage = ({ jobOffer, setShowModals }) => {
    const { slug } = useParams();
    const [acceptedApplications, setAcceptedApplications] = useState([]);
    const [rejectedApplications, setRejectedApplications] = useState([]);
    const [applications, setApplications] = useState([]);
    const [showApplications, setShowApplications] = useState(false);
    const [showAcceptedApplications, setShowAcceptedApplications] = useState(false);
    const [showReApplications, setShowRejectedApplications] = useState(false);

    const statusMessage = {
        'ACCEPTED': 'zaakceptowana',
        'REJECTED': 'odrzucona',
    };

    useEffect(() => {
        if (jobOffer) {
            splitApplications(jobOffer.applications);
        }
    }, [jobOffer]);

    const splitApplications = (applications) => {
        setApplications(applications);
        setAcceptedApplications(applications.filter((el) => el.status === 'ACCEPTED'));
        setRejectedApplications(applications.filter((el) => el.status === 'REJECTED'));
    };

    const onClickChangeStatus = (application, status) => {

        authAxios
            .post(API_URL + '/applications/' + application.id + '/change-status', {
                status: status,
            })
            .then((response) => {
                const newStatus = response.data.status;
                let newApplications = [...applications];
                let index = newApplications.indexOf(application);
                newApplications[index].status = newStatus;
                splitApplications(applications);
                window.flash(
                    'Status aplikacji został zmieniony na ' + statusMessage[status],
                    status === 'ACCEPTED' ? 'success' : 'error',
                );
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className={'applications-wrapper'}>
            {jobOffer ? (
                <div>
                    <div>
                        <JobOfferStatistics jobOffer={jobOffer} setShowModals={setShowModals} />
                        <hr className={'col-span-full mt-6 '} style={{ backgroundColor: '#0F528B', opacity: '0.8' }} />
                    </div>

                    <p className={'text-4xl pt-2 text-center'}>Aplikacje</p>

                    <p className={'font-module mt-5 margin-l '}>{'Wszystkie (' + applications.length + ')'} </p>
                    <div className={'mt-4 flex flex-col items-center'}>
                        {applications.map((application, id) => {
                            return (
                                <PrincipleApplicationCard
                                    application={application}
                                    onClickReject={() => onClickChangeStatus(application, 'REJECTED')}
                                    onClickAccept={() => onClickChangeStatus(application, 'ACCEPTED')}
                                    jobOfferStatus={jobOffer.archived}
                                    id={id}
                                    key={id}
                                />
                            );
                        })}
                    </div>

                    <p className={'font-module mt-5 margin-l '}>
                        {'Zaakceptowane (' + acceptedApplications.length + ')'}{' '}
                    </p>
                    <div className={'mt-4 flex flex-col items-center'}>
                        {acceptedApplications.map((application, id) => {
                            return (
                                <PrincipleApplicationCard
                                    application={application}
                                    id={id}
                                    onClickReject={() => onClickChangeStatus(application, 'REJECTED')}
                                    onClickAccept={() => onClickChangeStatus(application, 'ACCEPTED')}
                                    jobOfferStatus={jobOffer.archived}
                                    key={id}
                                />
                            );
                        })}
                    </div>

                    <p className={'font-module mt-5 margin-l '}>{'Odrzucone (' + rejectedApplications.length + ')'} </p>
                    <div className={'mt-4 flex flex-col items-center'}>
                        {rejectedApplications.map((application, id) => {
                            return (
                                <PrincipleApplicationCard
                                    application={application}
                                    id={id}
                                    onClickReject={() => onClickChangeStatus(application, 'REJECTED')}
                                    onClickAccept={() => onClickChangeStatus(application, 'ACCEPTED')}
                                    jobOfferStatus={jobOffer.archived}
                                    key={id}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
};
