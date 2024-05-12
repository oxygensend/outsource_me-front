import { memo, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import profileService from '../../services/profileService';
import { Languages } from './Languages';
import { JobPositions } from './JobPosition';
import { Education } from './Education';
import { Technologies } from './Technologies';
import { Description } from './Description';
import { PersonalInfo } from './PersonalInfo';
import tokenService from '../../services/tokenService';
import { JobOffers } from './JobOffers';

export const ProfilePage = memo(({ style, setShowModals, personalData, languages , opinionsDetails}) => {
    const { id } = useParams();
    const DEVELOPER_ROLE = 'DEVELOPER';

    const getTechnologies = () => {
        profileService
            .getTechnologies(id)
            .then((response) => {
                if (response.status === 200) {
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    /**
     * Personal data have to be rendered first
     */
    if (personalData && opinionsDetails)
        return (
            <div className={'profile-container  '} style={style}>
                <PersonalInfo personalData={personalData} setShowModals={setShowModals} opinionsDetails={opinionsDetails} />

                <Description personalData={personalData} setShowModals={setShowModals} />
                <Languages id={personalData.id} personalData={personalData} setShowModals={setShowModals} />
                <JobPositions id={personalData.id} personalData={personalData} setShowModals={setShowModals} />
                <Education id={personalData.id} personalData={personalData} setShowModals={setShowModals} />

                {personalData.accountType === DEVELOPER_ROLE ? (
                    <Technologies personalData={personalData} setShowModals={setShowModals} />
                ) : (
                    <JobOffers personalData={personalData} />
                )}
            </div>
        );
    else return null;
});
