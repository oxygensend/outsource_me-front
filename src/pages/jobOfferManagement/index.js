import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getData} from "../../services/utils";
import authAxios from "../../services/authAxios";
import {JobOfferManagementPage} from "../../Components/JobOfferManagement/JobOfferManagementPage";
import {ConfirmModal} from "../../Components/Modals/ConfirmModal";
import parse from "html-react-parser";
import {EditJobOfferModal} from "../../Components/Modals/EditJobOfferModal";

export const JobOfferManagement = () => {
    const {slug} = useParams();
    const [jobOffer, setJobOffer] = useState();
    const [showModals, setShowModals] = useState(
        {
            closeOfferModal: false,
            editOfferModal: false,
            openOfferModal: false
        }
    )
    useEffect(() => {
        return () => {
            getData('/api/job_offers/' + slug).then(data => setJobOffer(data))
        };
    }, []);

    const onClickArchiveJobOffer = () => {
        authAxios.delete('/api/job_offers/' + jobOffer.id).then(response => {
            setShowModals((prevState) => ({...prevState, ['closeOfferModal']: false}));
            jobOffer.archived = 1;
        }).catch(e => {
            console.log(e);
        })
    }
    const closeModal = (modalName) => {
        setShowModals((prevState) => ({...prevState, [modalName]: false}));
    }

    const openOfferContent = (offerName) => {
        return parse("Czy na pewno chcesz otworzyć oferte na stanowisko <b>" + offerName + "</b>?");
    }
    const closeOfferContent = (offerName) => {
        return parse("Czy na pewno chcesz zamknąć oferte na stanowisko <b>" + offerName + "</b>?");
    }
    return (
        <>
            <JobOfferManagementPage
                jobOffer={jobOffer}
                setShowModals={setShowModals}
            />

            {showModals.closeOfferModal ?
                <ConfirmModal
                    title={"Zamknij oferte"}
                    setShowModals={setShowModals}
                    onAgreeClick={() => onClickArchiveJobOffer()}
                    onDeclineClick={() => closeModal('closeOfferModal')}
                    content={closeOfferContent(jobOffer.name)}
                    confirmButtonValue={"Tak"}
                    declineButtonValue={"Nie"}
                    prop={"closeOfferModal"}
                /> : null
            }
            {showModals.openOfferModal ?
                <ConfirmModal
                    title={"Otwórz oferte"}
                    setShowModals={setShowModals}
                    onAgreeClick={() => onClickArchiveJobOffer()}
                    onDeclineClick={() => closeModal('openOfferModal')}
                    content={openOfferContent(jobOffer.name)}
                    confirmButtonValue={"Tak"}
                    declineButtonValue={"Nie"}
                    prop={"openOfferModal"}
                /> : null
            }

            {showModals.editOfferModal === true ?
                <EditJobOfferModal
                    setShowModals={setShowModals}
                    jobOffer={jobOffer}
                /> : null
            }
        </>
    );
}