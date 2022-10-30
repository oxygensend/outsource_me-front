import {ProfilePage} from "../../Components/profile/ProfilePage";
import {useEffect, useState} from "react";
import {getData, getDataAuthentication} from "../../services/utils";
import {AddJobPositionModal} from "../../Components/ProfileEditModal/AddJobPositionModal";

export const ProfileAddJobPosition = () => {
    const [companiesList, setCompaniesList] = useState([]);
    const [formOfEmployments, setFormOfEmployments] = useState([]);

    useEffect(() => {
        return () => {
            Promise.all([
                getData('/api/companies').then(companies => {
                    setCompaniesList(companies['hydra:member']);
                }),
                getData('/api/form_of_employments').then(data => {
                    setFormOfEmployments(data['hydra:member']);
                })

            ])
        };
    }, []);

    return (
        <div className={"overflow-hidden overscroll-y-none"}>

            <ProfilePage/>
            <AddJobPositionModal
                companiesList={companiesList}
                formOfEmployments={formOfEmployments}
            />

        </div>
    );
}