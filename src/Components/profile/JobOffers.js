import {ProfileModule} from "./ProfileModule";
import React, {useState} from "react";
import {JobOfferSmallCard} from "../JobOfferCard/JobOfferSmallCard";

export const JobOffers = ({personalData}) => {

    const [showResults, setShowResults] = useState(false);
    const results = [];

    const onClickAdd = () => {
        window.location.href = '/oferty_zlecen/dodaj_oferte';
    }

    personalData.jobOffers.forEach(jobOffer => {
        results.push(
            <JobOfferSmallCard
                jobOffer={jobOffer}
                id={personalData.id}
            />
        )
    });


    return (
        <ProfileModule
            title={"Dostępne oferty"}
            breakLine={true}
            onClickAdd={onClickAdd}
            personalData={personalData}
            editRedirectUrl={'/profil/' + personalData.id + '/oferty_zlecen'}
        >

            {showResults ? results : results.slice(0, 3)}
            {results.length > 3 && !showResults ?
                <p className={"red-font mt-5 cursor-pointer"}
                   onClick={() => setShowResults(true)}>
                    Pokaż więcej...
                </p>
                : null}

        < /ProfileModule>
    );
}
