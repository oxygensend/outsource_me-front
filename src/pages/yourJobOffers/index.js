import React, {useEffect, useState} from "react";
import tokenService from "../../services/tokenService";
import {getData} from "../../services/utils";
import {JobOfferSmallCard} from "../../Components/JobOfferCard/JobOfferSmallCard";
import {JobOfferManagementCard} from "../../Components/JobOfferCard/JobOfferManagementCard";

export const YourJobOffers = () => {

    const [showArchivedJobOffers, setShowArchivedJobOffers] = useState(false);
    const [showActiveJobOffers, setShowActiveJobOffers] = useState(false);
    const [activeJobOffers, setActiveJobOffers] = useState([])
    const [archivedJobOffers, setArchivedJobOffers] = useState([])
    const {id} = tokenService.getUser();

    useEffect(() => {
        return () => {
            getData('/api/job_offers?sort=newest&user.id=' + id).then(data => {
                    console.log(data);
                    let active = [];
                    let archived = [];
                    data['hydra:member'].forEach((application, i) => {
                        if (!application.archived)
                            active.push(
                                <JobOfferManagementCard
                                    id={i}
                                    jobOffer={application}
                                />
                            )
                        else {
                            archived.push(
                                <JobOfferSmallCard
                                    id={i}
                                    jobOffer={application}
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
            <div className={"text-center text-3xl "}>
                <p>Twoje oferty </p>
            </div>

            <hr className={" mt-4 "} style={{backgroundColor: "#0F528B", opacity: "0.8"}}/>
            <div>
                <p className={"font-module mt-5 margin-l "}>{"Nie widziane aplikacje(" + activeJobOffers.length + ")"} </p>
                <div className="flex flex-col mt-5 gap-3 items-center">

                    {showActiveJobOffers ? activeJobOffers : activeJobOffers.slice(0, 3)}

                </div>
                {activeJobOffers.length > 3 && !showActiveJobOffers ?
                    <p className={"red-font mt-2 margin-l cursor-pointer"}
                       onClick={() => setShowActiveJobOffers(true)}>
                        Pokaż wszystkie...
                    </p>
                    : null}
            </div>

            <div>
                <p className={"font-module mt-5 margin-l "}>{"Aktywne oferty(" + activeJobOffers.length + ")"} </p>
                <div className="flex flex-col mt-5 gap-3 items-center">

                    {showActiveJobOffers ? activeJobOffers : activeJobOffers.slice(0, 3)}

                </div>
                {activeJobOffers.length > 3 && !showActiveJobOffers ?
                    <p className={"red-font mt-2 margin-l cursor-pointer"}
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
                    <p className={"red-font mt-2 mb-2 margin-l cursor-pointer"}
                       onClick={() => setShowArchivedJobOffers(true)}>
                        Pokaż wszystkie...
                    </p>
                    : null}
            </div>
        </div>
    );
}