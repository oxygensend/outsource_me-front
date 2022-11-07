import React, {useEffect, useState} from "react";
import './index.css';
import {getData} from "../../services/utils";
import tokenService from "../../services/tokenService";
import moment from "moment/moment";
import 'moment/locale/pl'
import {ApplicationCard} from "../../Components/Application/ApplicationCard";
import {UserApplicationPage} from "../../Components/Application/UserApplicationPage";
import {ConfirmModal} from "../../Components/Modals/ConfirmModal";
import parse from 'html-react-parser'
import {ApplicationPreviewModal} from "../../Components/Modals/ApplicationPreviewModal";

moment.locale('pl');

export const YourApplications = () => {
    const [activeApplications, setActiveApplications] = useState(null)
    const [deactiveApplications, setDeactiveApplications] = useState(null)
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showModals, setShowModals] = useState({
        deleteApplication: false,
        previewApplication: false,
    })
    const {id} = tokenService.getUser();
    const openDeleteApplicationModalContent = (application) => {
        return parse(`Czy na pewno chcesz usunąć aplikacje na stanowisko <b>` + application.jobOffer.name + `</b>?`);
    }

    useEffect(() => {
        return () => {
            getData('/api/users/' + id + '/applications?order[createdAt]=desc&order[status]=desc').then(data => {
                    let active = [];
                    let deactive = [];
                    data['hydra:member'].forEach((application, i) => {
                        if (application.status === 1)
                            active.push(
                                <ApplicationCard
                                    id={i}
                                    application={application}
                                    onClickDelete={() => onClickDelete(application)}
                                    onClickPreview={() => onClickPreview(application)}
                                />
                            )
                        else {
                            deactive.push(
                                <ApplicationCard
                                    id={i}
                                    application={application}
                                    onClickDelete={() => onClickDelete(application)}
                                    onClickPreview={() => onClickPreview(application)}
                                />
                            )
                        }
                    });
                    setDeactiveApplications(deactive);
                    setActiveApplications(active);
                }
            );
        };
    }, []);

    const onClickDelete = (application) => {
        setShowModals((prevState) => ({...prevState, ['deleteApplication']: true}));
        setSelectedApplication(application)

    }
    const closeModal = (modalName) => {
        setTimeout(() => {
            setShowModals((prevState) => ({...prevState, [modalName]: false}));
        }, 200)
    }
    const onClickPreview = (application) => {
        console.log('s');
        setSelectedApplication(application)
        setShowModals((prevState) => ({...prevState, ['previewApplication']: true}));
    }

    if (deactiveApplications || activeApplications) {
        return (
            <>

                <UserApplicationPage
                    deactiveApplications={deactiveApplications}
                    activeApplications={activeApplications}
                />
                {
                    showModals.deleteApplication === true ?
                        <ConfirmModal
                            title={"Aplikacja na stanowisko " + selectedApplication.jobOffer.name}
                            setShowModals={setShowModals}
                            onAgreeClick={() => onClickDelete(true, 'deleteApplication')}
                            onDeclineClick={() => closeModal('deleteApplication')}
                            content={openDeleteApplicationModalContent(selectedApplication)}
                            confirmButtonValue={"Tak"}
                            declineButtonValue={"Nie"}
                            prop={"deleteApplication"}
                        /> : null
                }

                {
                    showModals.previewApplication === true ?
                        <ApplicationPreviewModal
                            application={selectedApplication}
                            setShowModals={setShowModals}
                        />: null
                }

            < />
        );
    } else {
        return null;
    }
}