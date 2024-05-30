import { ApplicationInfoBox } from '../../components/Application/ApplicationInfoBox';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../services/utils';
import { ProfilePage } from '../../components/Profile/ProfilePage';
import { InfoModal } from '../../components/Modals/InfoModal';
import { ApplicationMessageModal } from '../../components/Modals/ApplicationMessageModal';
import { ContactModal } from '../../components/Modals/ContactModal';
import { data } from 'autoprefixer';

export const Application = () => {
    const [personalData, setPersonalData] = useState();
    const [opinionDetails, setOpinionDetails] = useState();
    const [application, setApplication] = useState();
    const [showModals, setShowModals] = useState({
        contactModal: false,
        messageModal: false,
        applicationMessageModal: false,
    });
    const { applicationId } = useParams();

    useEffect(() => {
        return () => {
            getData('/applications/' + applicationId).then((data) => setApplication(data));
        };
    }, []);

    useEffect(() => {
        if (application) {
            Promise.all([
                getData('/users/' + application.user.id),
                getData('/users-opinion-details/' + application.user.id)])
            .then(([personalData, opinionsDetails]) => {
                setPersonalData(personalData);
                setOpinionDetails(opinionsDetails);
            });
        }
    }, [application]);


    if (personalData) {
        return (
            <>
                <ProfilePage personalData={personalData} setShowModals={setShowModals} opinionsDetails={opinionDetails} />

                <ApplicationInfoBox application={application} setShowModals={setShowModals} />

                {showModals.contactModal === true ? (
                    <InfoModal
                        title={personalData.fullName}
                        setShowModals={setShowModals}
                        prop={'contactModal'}
                        personalData={personalData}
                    />
                ) : null}

                {showModals.applicationMessageModal === true ? (
                    <ApplicationMessageModal application={application} setShowModals={setShowModals} />
                ) : null}

                {showModals.messageModal === true ? (
                    <ContactModal userId={application.user.id} setShowModals={setShowModals} />
                ) : null}
            </>
        );
    }
};
