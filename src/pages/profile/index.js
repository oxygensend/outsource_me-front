import './index.css';
import {ProfilePage} from "../../Components/profile/ProfilePage";
import {AddTechnologyModal} from "../../Components/Modals/AddTechnologyModal";
import {useEffect, useState} from "react";
import {AddLanguagesModal} from "../../Components/Modals/AddLanguagesModal";
import {AddJobPositionModal} from "../../Components/Modals/AddJobPositionModal";
import {AddExpirienceModal} from "../../Components/Modals/AddExpirienceModal";
import {EditDescriptionModal} from "../../Components/Modals/EditDescriptionModal";
import {useParams} from "react-router-dom";
import profileService from "../../services/profileService";
import {EditPersonalInfoModal} from "../../Components/Modals/EditPersonalInfoModal";
import {closeModal, getId} from "../../services/utils";
import {ConfirmModal} from "../../Components/Modals/ConfirmModal";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";
import {InfoModal} from "../../Components/Modals/InfoModal";
import {ContactModal} from "../../Components/Modals/ContactModal";


export const Profile = () => {
    const [personalData, setPersonalData] = useState();
    const [languages, setLanguages] = useState();
    const id = getId(useParams().id);
    const openAdvertisementModalContent = "Przed dodaniem zgłoszenia upewnij się, ze w zakładkach na twoim profilu zawarte są wszystkie potrzebne\n" +
        "                informacje. Jeżeli chcesz, coś zmienić zrób to teraz, więcej informacji o Tobie pomaga lepszym\n" +
        "                odzewem od zleceniodawców."

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
            closeAdvertisement: false,
            contactModal: false,
            messageModal: false

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
            closeModal(modalName, setShowModals);
            setPersonalData((prevState) => ({...prevState, ['lookingForJob']: status}));
        })
            .catch((e) => {

                console.log(e);

            })
    }

    return (
        <>
            <ProfilePage
                setShowModals={setShowModals}
                personalData={personalData}
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
                    title={"Pokaż, że jesteś otwarty na nowe zlecenia!"}
                    setShowModals={setShowModals}
                    onAgreeClick={() => onClickChangeUserStatus(true, 'openAdvertisement')}
                    onDeclineClick={() => closeModal('openAdvertisement', setShowModals)}
                    content={openAdvertisementModalContent}
                    confirmButtonValue={"Potwierdź"}
                    declineButtonValue={"Anuluj"}
                    prop={"openAdvertisement"}
                /> : null
            }

            {showModals.closeAdvertisement === true ?
                <ConfirmModal
                    title={"Pokaż, że jesteś otwarty na nowe zlecenia!"}
                    setShowModals={setShowModals}
                    onAgreeClick={() => onClickChangeUserStatus(false, 'closeAdvertisement')}
                    onDeclineClick={() => closeModal('closeAdvertisement', setShowModals)}
                    content={closeAdvertisementModalContent}
                    confirmButtonValue={"Tak"}
                    declineButtonValue={"Nie"}
                    prop={"closeAdvertisement"}
                /> : null
            }

            {showModals.contactModal === true ?
                <InfoModal
                    title={personalData.fullName}
                    setShowModals={setShowModals}
                    prop={"contactModal"}
                    personalData={personalData}
                />
                : null

            }

            {showModals.messageModal === true ?
                <ContactModal
                    userIri={personalData['@id']}
                    setShowModals={setShowModals}
                />
                : null
            }
        </>
    )
}