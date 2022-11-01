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


export const Profile = () => {
    const [personalData, setPersonalData] = useState();
    const [languages, setLanguages] = useState();
    const id = getId(useParams().id);

    useEffect(() => {
        return () => {
            getPersonalData();
            getLanguages();
        };
    }, []);


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

    const [showModals, setShowModals] = useState(
        {
            technologies: false,
            languages: false,
            jobPositions: false,
            education: false,
            description: false,
            personalInfo: false
        }
    )


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
        </>
    )
}