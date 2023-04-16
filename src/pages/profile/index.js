import './index.css';
import { ProfilePage } from '../../components/Profile/ProfilePage';
import { AddTechnologyModal } from '../../components/Modals/AddTechnologyModal';
import { useEffect, useState } from 'react';
import { AddLanguagesModal } from '../../components/Modals/AddLanguagesModal';
import { AddJobPositionModal } from '../../components/Modals/AddJobPositionModal';
import { AddExpirienceModal } from '../../components/Modals/AddExpirienceModal';
import { EditDescriptionModal } from '../../components/Modals/EditDescriptionModal';
import { useParams } from 'react-router-dom';
import profileService from '../../services/profileService';
import { EditPersonalInfoModal } from '../../components/Modals/EditPersonalInfoModal';
import { closeModal, getData, getId } from '../../services/utils';
import { ConfirmModal } from '../../components/Modals/ConfirmModal';
import authAxios from '../../services/authAxios';
import { API_URL } from '../../config';
import { InfoModal } from '../../components/Modals/InfoModal';
import { ContactModal } from '../../components/Modals/ContactModal';
import { UploadPhotoModal } from '../../components/Modals/UploadPhotoModal';
import { OpinionsModal } from '../../components/Modals/OpinionsModal';

export const Profile = () => {
    const [personalData, setPersonalData] = useState();
    const [opinions, setOpinions] = useState();
    const id = getId(useParams().id);
    const openAdvertisementModalContent =
        'Przed dodaniem zgłoszenia upewnij się, ze w zakładkach na twoim profilu zawarte są wszystkie potrzebne\n' +
        '                informacje. Jeżeli chcesz, coś zmienić zrób to teraz, więcej informacji o Tobie pomaga lepszym\n' +
        '                odzewem od zleceniodawców.';

    const closeAdvertisementModalContent = 'Czy na pewno chcesz ściągnąć swoje zgłoszenie z tablicy?';

    const advertisementFlashMessage = {
        true: {
            key: 'success',
            message: 'Ogłoszenie zostało umieszczone.',
        },
        false: {
            key: 'error',
            message: 'Ogłoszenie zostało ściągniete z listy ofert.',
        },
    };

    useEffect(() => {
        return () => {
            getPersonalData();
            getOpinions();
        };
    }, []);

    const [showModals, setShowModals] = useState({
        technologies: false,
        languages: false,
        jobPositions: false,
        education: false,
        description: false,
        personalInfo: false,
        openAdvertisement: false,
        closeAdvertisement: false,
        contactModal: false,
        messageModal: false,
        uploadPhotoModal: false,
        opinionsModal: false,
    });

    const getPersonalData = () => {
        profileService
            .getPersonalData(id)
            .then((response) => {
                if (response.status === 200) {
                    setPersonalData(response.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getOpinions = () => {
        getData('/api/users/' + id + '/opinions')
            .then((response) => {
                setOpinions(response['hydra:member']);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onClickChangeUserStatus = (status, modalName) => {
        authAxios
            .patch(
                API_URL + '/users/' + id,
                {
                    lookingForJob: status,
                },
                {
                    headers: {
                        'Content-Type': 'application/merge-patch+json',
                    },
                },
            )
            .then((data) => {
                closeModal(modalName, setShowModals);
                setPersonalData((prevState) => ({
                    ...prevState,
                    ['lookingForJob']: status,
                }));
                window.flash(advertisementFlashMessage[status].message, advertisementFlashMessage[status].key);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            <ProfilePage setShowModals={setShowModals} personalData={personalData} />

            {showModals.technologies ? <AddTechnologyModal setShowModals={setShowModals} /> : null}

            {showModals.education ? <AddExpirienceModal setShowModals={setShowModals} showModals={showModals} /> : null}

            {showModals.jobPositions ? <AddJobPositionModal setShowModals={setShowModals} /> : null}
            {showModals.languages === true ? <AddLanguagesModal setShowModals={setShowModals} /> : null}

            {showModals.description === true ? (
                <EditDescriptionModal setShowModals={setShowModals} personalData={personalData} />
            ) : null}

            {showModals.personalInfo === true ? (
                <EditPersonalInfoModal setShowModals={setShowModals} personalData={personalData} />
            ) : null}

            {showModals.openAdvertisement === true ? (
                <ConfirmModal
                    title={'Pokaż, że jesteś otwarty na nowe zlecenia!'}
                    setShowModals={setShowModals}
                    onAgreeClick={() => onClickChangeUserStatus(true, 'openAdvertisement')}
                    onDeclineClick={() => closeModal('openAdvertisement', setShowModals)}
                    content={openAdvertisementModalContent}
                    confirmButtonValue={'Potwierdź'}
                    declineButtonValue={'Anuluj'}
                    prop={'openAdvertisement'}
                />
            ) : null}

            {showModals.closeAdvertisement === true ? (
                <ConfirmModal
                    title={'Pokaż, że jesteś otwarty na nowe zlecenia!'}
                    setShowModals={setShowModals}
                    onAgreeClick={() => onClickChangeUserStatus(false, 'closeAdvertisement')}
                    onDeclineClick={() => closeModal('closeAdvertisement', setShowModals)}
                    content={closeAdvertisementModalContent}
                    confirmButtonValue={'Tak'}
                    declineButtonValue={'Nie'}
                    prop={'closeAdvertisement'}
                />
            ) : null}

            {showModals.contactModal === true ? (
                <InfoModal
                    title={personalData.fullName}
                    setShowModals={setShowModals}
                    prop={'contactModal'}
                    personalData={personalData}
                />
            ) : null}

            {showModals.messageModal === true ? (
                <ContactModal userIri={personalData['@id']} setShowModals={setShowModals} />
            ) : null}

            {showModals.uploadPhotoModal === true ? (
                <UploadPhotoModal setShowModals={setShowModals} personalData={personalData} />
            ) : null}

            {showModals.opinionsModal === true ? (
                <OpinionsModal
                    setShowModals={setShowModals}
                    opinions={opinions}
                    personalData={personalData}
                    setOpinions={setOpinions}
                />
            ) : null}
        </>
    );
};
