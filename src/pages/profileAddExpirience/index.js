import {ProfilePage} from "../../Components/profile/ProfilePage";
import {AddTechnologyModal} from "../../Components/ProfileEditModal/AddTechnologyModal";
import {AddExpirienceModal} from "../../Components/ProfileEditModal/AddExpirienceModal";
import {useEffect, useState} from "react";
import {getData, getDataAuthentication} from "../../services/utils";

export const ProfileAddExpirience = () => {
    const [universitiesList, setUniversitiesList] = useState([]);

    useEffect(() => {
        return () => {
            getDataAuthentication('/api/universities').then(universities => {
                setUniversitiesList(universities['hydra:member']);
            });
        };
    }, []);

    return (
        <div>

            <ProfilePage/>
            {/*<AddExpirienceModal*/}
            {/*    universitiesList={universitiesList}*/}
            />


        </div>
    );
}