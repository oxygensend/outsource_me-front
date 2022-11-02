import './index.css';
import {ProfilePage} from "../../Components/profile/ProfilePage";
import {AddTechnologyModal} from "../../Components/ProfileModals/AddTechnologyModal";
import {useEffect, useState} from "react";
import {AddLanguagesModal} from "../../Components/ProfileModals/AddLanguagesModal";
import {AddJobPositionModal} from "../../Components/ProfileModals/AddJobPositionModal";
import {AddExpirienceModal} from "../../Components/ProfileModals/AddExpirienceModal";
import {EditDescriptionModal} from "../../Components/ProfileModals/EditDescriptionModal";
import {useParams} from "react-router-dom";
import tokenService from "../../services/tokenService";
import profileService from "../../services/profileService";
import {EditPersonalInfoModal} from "../../Components/ProfileModals/EditPersonalInfoModal";
import {getId} from "../../services/utils";
import {ConfirmModal} from "../../Components/ProfileModals/ConfirmModal";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";


export const Profile = () => {
    const [personalData, setPersonalData] = useState();
    const [languages, setLanguages] = useState();
    const id = getId(useParams().id);
    const openAdvertisementModalContent = "Przed dodaniem zgłoszenia upewnij się, ze w zakładkach na twoim profilu zawarte są wszystkie potrzebne\n" +
        "                informacje. Jeżeli chcesz, coś zmienić zrób to teraz, więcej informacji o Tobie pomaga rekruterom w\n" +
        "                wyborze."

    const closeAdvertisementModalContent = "Czy na pewno chcesz ściągnąć swoje zgłoszenie z tablicy?"

    useEffect(() => {
        return () => {
            getPersonalData();
            getLanguages();
        };
    }, []);

    const [showModals, setShowModals] = useState(
        {
            technologies: false,
            languages: false,
            jobPositions: false,
            education: false,
            description: false,
            personalInfo: false,
            openAdvertisement: false,
            closeAdvertisement: false

        }
    )


    const getLanguages = () => {
        profileService.getLanguages(id)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    setLanguages(response.data['hydra:member']);
                }
            }).catch(err => {

            console.log(err);
        });
    }

    const getPersonalData = () => {
        profileService.getPersonalData(id)
            .then(response => {
                if (response.status === 200) {
                    setPersonalData(response.data)
                }
            }).catch(err => {

            console.log(err);
        });
    }

    const onClickChangeUserStatus = (status, modalName) => {

        authAxios.patch(API_URL + '/users/' + id, {
            lookingForJob: status
        }, {
            headers: {
                "Content-Type": "application/merge-patch+json"
            }
        }).then(data => {
            closeModal(modalName);
            setPersonalData((prevState) => ({...prevState, ['lookingForJob']: status}));
        })
            .catch((e) => {

                console.log(e);

            })
    }
    const closeModal = (modalName) => {
        setShowModals((prevState) => ({...prevState, [modalName]: false}));
    }

    return (
        <>
            <ProfilePage
                setShowModals={setShowModals}
                personalData={personalData}
                languages={languages}
            />

            {showModals.technologies ?
                <AddTechnologyModal
                    setShowModals={setShowModals}
                /> : null
            }

            {showModals.education ?
                <AddExpirienceModal
                    setShowModals={setShowModals}
                    showModals={showModals}
                /> : null
            }

            {showModals.jobPositions ?
                <AddJobPositionModal
                    setShowModals={setShowModals}
                /> : null
            }
            {showModals.languages === true ?
                <AddLanguagesModal
                    setShowModals={setShowModals}
                /> : null
            }

            {showModals.description === true ?
                <EditDescriptionModal
                    setShowModals={setShowModals}
                    personalData={personalData}
                /> : null
            }

            {showModals.personalInfo === true ?
                <EditPersonalInfoModal
                    setShowModals={setShowModals}
                    personalData={personalData}
                /> : null
            }

            {showModals.openAdvertisement === true ?
                <ConfirmModal
                    setShowModals={setShowModals}
                    onAgreeClick={() => onClickChangeUserStatus(true, 'openAdvertisement')}
                    onDeclineClick={() => closeModal('openAdvertisement')}
                    content={openAdvertisementModalContent}
                    confirmButtonValue={"Potwierdź"}
                    declineButtonValue={"Anuluj"}
                    prop={"openAdvertisement"}
                /> : null
            }

            {showModals.closeAdvertisement === true ?
                <ConfirmModal
                    setShowModals={setShowModals}
                    onAgreeClick={() => onClickChangeUserStatus(false, 'closeAdvertisement')}
                    onDeclineClick={() => closeModal('closeAdvertisement')}
                    content={closeAdvertisementModalContent}
                    confirmButtonValue={"Tak"}
                    declineButtonValue={"Nie"}
                    prop={"closeAdvertisement"}
                /> : null
            }
        </>
    )
}