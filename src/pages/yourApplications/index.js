import React, {useEffect, useState} from "react";
import './index.css';
import {closeModal, getData} from "../../services/utils";
import tokenService from "../../services/tokenService";
import moment from "moment/moment";
import 'moment/locale/pl'
import {ApplicationCard} from "../../Components/Application/ApplicationCard";
import {UserApplicationPage} from "../../Components/Application/UserApplicationPage";
import {ConfirmModal} from "../../Components/Modals/ConfirmModal";
import parse from 'html-react-parser'
import {ApplicationPreviewModal} from "../../Components/Modals/ApplicationPreviewModal";
import authAxios from "../../services/authAxios";
import app from "../../App";



export const YourApplications = () => {
    const [activeApplications, setActiveApplications] = useState([])
    const [deactiveApplications, setDeactiveApplications] = useState([])
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
                                    key={i}
                                    application={application}
                                    onClickDelete={() => onClickDelete(application)}
                                    onClickPreview={() => onClickPreview(application)}
                                />
                            )
                        else {
                            deactive.push(
                                <ApplicationCard
                                    key={i}
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
        window.flash(parse("Aplikacja na stanowisko <b>" + application.jobOffer.name + "</b> zostala usunięta"), 'error')


    }

    const onClickDeleteElement = (application) => {

        authAxios.delete(application['@id']).then(data => {
            let newApplications = [...activeApplications];
            let deleted = newApplications.filter((el) => el.props.application !== application);
            setActiveApplications(deleted)
            setSelectedApplication(null);
        }).catch(e => {
            console.log(e)
        });
        closeModal('deleteApplication', setShowModals);
    }


    const onClickPreview = (application) => {
        setSelectedApplication(application)
        setShowModals((prevState) => ({...prevState, ['previewApplication']: true}));
    }

    if (activeApplications) {
        return (
            <>

                <UserApplicationPage
                    deactiveApplications={deactiveApplications}
                    activeApplications={activeApplications}
                />
                {
                    showModals.deleteApplication === true && selectedApplication ?
                        <ConfirmModal
                            title={"Aplikacja na stanowisko " + selectedApplication.jobOffer.name}
                            setShowModals={setShowModals}
                            onAgreeClick={() => onClickDeleteElement(selectedApplication)}
                            onDeclineClick={() => closeModal('deleteApplication', setShowModals)}
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
                        /> : null
                }

            < />
        );
    } else {
        return null;
    }
}