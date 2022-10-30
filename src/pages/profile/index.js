import './index.css';
import {ProfilePage} from "../../Components/profile/ProfilePage";
import {AddTechnologyModal} from "../../Components/ProfileEditModal/AddTechnologyModal";
import {useEffect, useState} from "react";
import {getData, getDataAuthentication} from "../../services/utils";
import {AddExpirienceModal} from "../../Components/ProfileEditModal/AddExpirienceModal";
import {AddJobPositionForm} from "../../Components/Forms/AddJobPositionForm";
import {AddJobPositionModal} from "../../Components/ProfileEditModal/AddJobPositionModal";
import {AddLanguagesModal} from "../../Components/ProfileEditModal/AddLanguagesModal";


export const Profile = () => {


    const [showModals, setShowModals] = useState(
        {
            technologies: false,
            languages: false,
            jobPositions: false,
            education: false,
        }
    )


    return (
        <>
            <ProfilePage
                setShowModals={setShowModals}
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
        </>
    )
}