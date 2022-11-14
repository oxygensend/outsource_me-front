import {ApplicationInfoBox} from "../../Components/Application/ApplicationInfoBox";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getData} from "../../services/utils";
import {ProfilePage} from "../../Components/profile/ProfilePage";
import {InfoModal} from "../../Components/Modals/InfoModal";
import {ApplicationMessageModal} from "../../Components/Modals/ApplicationMessageModal";
import {ContactModal} from "../../Components/Modals/ContactModal";

export const Application = () => {

    const [personalData, setPersonalData] = useState();
    const [application, setApplication] = useState();
    const [showModals, setShowModals] = useState({
        contactModal: false,
        messageModal: false,
        applicationMessageModal: false,
    })
    const {id} = useParams();

    useEffect(() => {
        return () => {
            getData('/api/applications/' + id).then(data => setApplication(data));
        };
    }, []);

    useEffect(() => {
        if (application) {
            getData(application.applying_person['@id']).then(data => setPersonalData(data))
        }
    }, [application]);

    if (personalData) {


        return (
            <>
                <ProfilePage
                    personalData={personalData}
                    setShowModals={setShowModals}
                />

                <ApplicationInfoBox
                    application={application}
                    setShowModals={setShowModals}
                />

                {showModals.contactModal === true ?
                    <InfoModal
                        title={personalData.fullName}
                        setShowModals={setShowModals}
                        prop={"contactModal"}
                        personalData={personalData}
                    />
                    : null

                }

                {showModals.applicationMessageModal === true ?
                    <ApplicationMessageModal
                        application={application}
                        setShowModals={setShowModals}
                    />
                    : null
                }

                {showModals.messageModal === true ?
                    <ContactModal
                        userIri={application.applying_person['@id']}
                        setShowModals={setShowModals}
                    />
                    : null
                }
            </>
        );
    }
}