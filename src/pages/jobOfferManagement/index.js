import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {closeModal, getData} from "../../services/utils";
import authAxios from "../../services/authAxios";
import {JobOfferManagementPage} from "../../components/JobOfferManagement/JobOfferManagementPage";
import {ConfirmModal} from "../../components/Modals/ConfirmModal";
import parse from "html-react-parser";
import {EditJobOfferModal} from "../../components/Modals/EditJobOfferModal";

export const JobOfferManagement = () => {
    const {slug} = useParams();
    const [jobOffer, setJobOffer] = useState();
    const [showModals, setShowModals] = useState(
        {
            closeOfferModal: false,
            editOfferModal: false,
        }
    )
    useEffect(() => {
        return () => {
            getData('/api/job_offers/' + slug).then(data => setJobOffer(data)).catch( e=> {
                window.location.href='/logowanie';
            })
        };
    }, []);

    const onClickArchiveJobOffer = () => {
        authAxios.delete(jobOffer['@id']).then(response => {
            setShowModals((prevState) => ({...prevState, ['closeOfferModal']: false}));
            jobOffer.archived = 1;
            window.flash("Oferta została zarchiwizowana", "error");

        }).catch(e => {
            console.log(e);
        })
    }


    const closeOfferContent = (offerName) => {
        return parse("Czy na pewno chcesz zamknąć oferte na stanowisko <b>" + offerName + "</b>? Po zamknieciu oferty nie bedzie możliwości jej ponownego otwarcia.");
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
                    onDeclineClick={() => closeModal('closeOfferModal', setShowModals)}
                    content={closeOfferContent(jobOffer.name)}
                    confirmButtonValue={"Tak"}
                    declineButtonValue={"Nie"}
                    prop={"closeOfferModal"}
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