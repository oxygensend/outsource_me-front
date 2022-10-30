import './index.css';
import {ProfilePage} from "../../Components/profile/ProfilePage";
import {AddTechnologyModal} from "../../Components/ProfileModals/AddTechnologyModal";
import {useEffect, useState} from "react";
import {AddLanguagesModal} from "../../Components/ProfileModals/AddLanguagesModal";
import {AddJobPositionModal} from "../../Components/ProfileModals/AddJobPositionModal";
import {AddExpirienceModal} from "../../Components/ProfileModals/AddExpirienceModal";


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