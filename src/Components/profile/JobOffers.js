import {ProfileModule} from "./ProfileModule";
import React, {useEffect, useState} from "react";
import {JobOfferSmallCard} from "../JobOfferCard/JobOfferSmallCard";
import {getData} from "../../services/utils";
import {JobOfferManagementCard} from "../JobOfferCard/JobOfferManagementCard";

export const JobOffers = ({personalData}) => {

    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);

    const onClickAdd = () => {
        window.location.href = '/nowe-zlecenie';
    }
    useEffect(() => {
        return () => {
            getData('/api/users/' + personalData.id + '/job_offers?order=newest').then(data => {
                    let temp = [];
                    data['hydra:member'].forEach((jobOffer, i) => {
                        temp.push(
                            <JobOfferSmallCard
                                jobOffer={jobOffer}
                                id={i}
                            />
                        )
                    });

                    setResults(temp);

                }
            );
        };
    }, []);


    return (
        <ProfileModule
            title={"Dostępne oferty"}
            breakLine={true}
            onClickAdd={onClickAdd}
            personalData={personalData}
            editRedirectUrl={'/profil/' + personalData.id + '/twoje-oferty'}
        >

            {showResults ? results : results.slice(0, 3)}
            {results.length > 3 && !showResults ?
                <p className={"red-font mt-5 cursor-pointer hover:underline hover:text-red-400"}
                   onClick={() => setShowResults(true)}>
                    Pokaż więcej...
                </p>
                : null}

        < /ProfileModule>
    );
}
