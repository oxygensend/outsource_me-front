import {ProfilePage} from "../../Components/profile/ProfilePage";
import {useEffect, useState} from "react";
import {getData, isInArray, searchArray} from "../../services/utils";
import {AddTechnologyModal} from "../../Components/ProfileEditModal/AddTechnologyModal";

export const ProfileAddTechnology = () => {


    const [technologiesList, setTechnologiesList] = useState([]);
    const [reload, setReload] = useState([]);

    useEffect( () => {
        setReload(false);
    }, [reload])

    useEffect(() => {
        return () => {
            getData('/api/technologies').then(technologies => {
                setTechnologiesList(technologies['hydra:member']);
            });
        };
    }, []);

    return (
        <div>

            <ProfilePage/>

          <AddTechnologyModal
          />

        </div>

    )
}