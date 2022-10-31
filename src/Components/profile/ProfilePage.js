import {memo, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import profileService from "../../services/profileService";
import {Languages} from "./Languages";
import {JobPositions} from "./JobPosition";
import {Education} from "./Education";
import {Technologies} from "./Technologies";
import {Description} from "./Description";
import {PersonalInfo} from "./PersonalInfo";

export const ProfilePage = memo(({style, setShowModals, personalData, languages}) => {


    const {id} = useParams();
    const DEVELOPER_ROLE = 'Developer';


    const getTechnologies = () => {
        profileService.getTechnologies(id)
            .then(response => {
                if (response.status === 200) {
                }
            }).catch(err => {

            console.log(err);
        });
    }


    /**
     * Personal data have to be rendered first
     */
    if (personalData)
        return (
            <div className={"profile-container "} style={style}>

                <PersonalInfo
                    personalData={personalData}
                    setShowModals={setShowModals}
                />

                <Description
                    personalData={personalData}
                    setShowModals={setShowModals}
                />
                <Languages id={personalData.id} languages={languages} personalData={personalData}
                           setShowModals={setShowModals}/>
                <JobPositions id={personalData.id} personalData={personalData} setShowModals={setShowModals}/>
                <Education id={personalData.id} personalData={personalData} setShowModals={setShowModals}/>

                {personalData.accountType === DEVELOPER_ROLE ?
                    <Technologies
                        personalData={personalData}
                        setShowModals={setShowModals}
                    />
                    : null}

            </div>

        );
    else
        return null;
});