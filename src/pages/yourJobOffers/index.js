import React, {useEffect, useState} from "react";
import tokenService from "../../services/tokenService";
import {getData} from "../../services/utils";
import {JobOfferManagementCard} from "../../Components/JobOfferCard/JobOfferManagementCard";
import {ButtonLink} from "../../Components/Button/ButtonLink";

export const YourJobOffers = () => {

    const [showArchivedJobOffers, setShowArchivedJobOffers] = useState(false);
    const [showActiveJobOffers, setShowActiveJobOffers] = useState(false);
    const [activeJobOffers, setActiveJobOffers] = useState([])
    const [archivedJobOffers, setArchivedJobOffers] = useState([])
    const {id} = tokenService.getUser();

    useEffect(() => {
        return () => {
            getData('/api/users/' + id + '/job_offers?order=newest').then(data => {
                    let active = [];
                    let archived = [];
                    data['hydra:member'].forEach((jobOffer, i) => {
                        if (!jobOffer.archived) {
                            active.push(
                                <JobOfferManagementCard
                                    key={i}
                                    jobOffer={jobOffer}
                                />
                            )
                        } else {
                            archived.push(
                                <JobOfferManagementCard
                                    key={i}
                                    jobOffer={jobOffer}
                                />
                            )
                        }
                    });

                    setArchivedJobOffers(archived);
                    setActiveJobOffers(active);
                }
            );
        };
    }, []);


    return (
        <div className={"applications-wrapper pt-4"}>
            <div className={"text-center text-3xl mr-50 "}>
                <p className={"ml-50"}>Twoje oferty </p>
                <ButtonLink
                    class={"outsourceme_button outsource_takeOff mt-4 sm:mt-0 relative transform -translate-x-1/2 left-1/2 sm:left-3/4 sm:absolute sm:translate-x-0 sm:top-4 "}
                    value={"Nowa oferta"}
                    route={"/nowe-zlecenie"}
                />
            </div>

            <hr className={" mt-4 "} style={{backgroundColor: "#0F528B", opacity: "0.8"}}/>
            {/*<div>*/}
            {/*    <p className={"font-module mt-5 margin-l "}>{"Nie widziane aplikacje(" + activeJobOffers.length + ")"} </p>*/}
            {/*    <div className="flex flex-col mt-5 gap-3 items-center">*/}

            {/*        {showActiveJobOffers ? activeJobOffers : activeJobOffers.slice(0, 3)}*/}

            {/*    </div>*/}
            {/*    {activeJobOffers.length > 3 && !showActiveJobOffers ?*/}
            {/*        <p className={"red-font mt-2 margin-l cursor-pointer"}*/}
            {/*           onClick={() => setShowActiveJobOffers(true)}>*/}
            {/*            Pokaż wszystkie...*/}
            {/*        </p>*/}
            {/*        : null}*/}
            {/*</div>*/}

            <div>
                <p className={"font-module mt-5 margin-l "}>{"Aktywne oferty(" + activeJobOffers.length + ")"} </p>
                <div className="flex flex-col mt-5 gap-3 items-center">

                    {showActiveJobOffers ? activeJobOffers : activeJobOffers.slice(0, 3)}

                </div>
                {activeJobOffers.length > 3 && !showActiveJobOffers ?
                    <p className={"red-font mt-2 margin-l cursor-pointer hover:underline hover:text-red-400"}
                       onClick={() => setShowActiveJobOffers(true)}>
                        Pokaż wszystkie...
                    </p>
                    : null}
            </div>

            <div>
                <p className={"font-module mt-5 margin-l "}>{"Wygaśnięte oferty(" + archivedJobOffers.length + ")"} </p>
                <div className="flex flex-col mt-5 gap-3 items-center">

                    {showArchivedJobOffers ? archivedJobOffers : archivedJobOffers.slice(0, 3)}

                </div>
                {archivedJobOffers.length > 3 && !showArchivedJobOffers ?
                    <p className={"red-font mt-2 mb-2 margin-l cursor-pointer hover:underline hover:text-red-400"}
                       onClick={() => setShowArchivedJobOffers(true)}>
                        Pokaż wszystkie...
                    </p>
                    : null}
            </div>
        </div>
    );
}