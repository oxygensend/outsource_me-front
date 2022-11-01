import bookmark from "../../assets/icons/Bookmark.png";
import {ButtonLink} from "../Button/ButtonLink";
import tokenService from "../../services/tokenService";
import React from "react";

export const JobOfferSmallCard = ({jobOffer, id}) => {
    return (
        <div className={"job-offer"}>
            <div className={"flex  flex-row justify-between ml-8 mr-8"}>

                <div className={"mt-2"}>
                    <p className={"fullname-font "}>{jobOffer.name}</p>
                    <p className={"company-font"}>{jobOffer?.companyName ?? "Ogłoszenie prywatne"}</p>
                </div>

                <div className={"col-start-11 col-start-12 mt-2"}>
                    <img src={bookmark} alt={"bookmark"}/>
                </div>
            </div>
            <div
                className={"grid grid-cols-12 mt-5 md:flex md:flex-row md:justify-between md:ml-8 md:mr-8 "}>


                <div className={"application-font col-start-2 md:mt-2 col-span-6"}>
                    <p>{jobOffer.numberOfApplications + ' aplikacje'}</p>
                </div>

                <ButtonLink
                    class={"application-button mt-5  md:mb-4 md:mt-0 col-span-full"}
                    value={tokenService.checkIfMe(id) ? "Podgląd" : "Aplikuj"}
                    route={"/oferty-zlecen/" + jobOffer.slug}
                    state={jobOffer}
                />

            </div>
        </div>
    );
}