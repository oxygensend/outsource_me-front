import bookmark from "../../assets/icons/Bookmark.png";
import {ButtonLink} from "../Button/ButtonLink";
import tokenService from "../../services/tokenService";
import React from "react";
import {applicationsStringPluralForm} from "../../services/utils";
import parse from "html-react-parser";

export const JobOfferSmallCard = ({jobOffer, id, className, description, applications}) => {
    return (
        <div className={"job-offer " + className ?? null}>
            <div className={"flex  flex-row justify-between ml-8 mr-8"}>

                <div className={"mt-2"}>
                    <p className={"fullname-font "}>{jobOffer.name}</p>
                </div>

                <div className={"col-start-11 col-start-12 mt-2"}>
                    <img src={bookmark} alt={"bookmark"}/>
                </div>
            </div>

            {description ?
                <div className={"pl-8 pt-2 pr-4"}>{parse(jobOffer.shortDescription)} </div>  : null
            }
            <div
                className={"grid grid-cols-12 mt-5 md:flex md:flex-row md:justify-between md:ml-8 md:mr-8 "}>

                <div className={"application-font col-start-2 md:mt-2 col-span-6"}>
                    {applications ?
                        <p>{jobOffer.numberOfApplications + applicationsStringPluralForm(jobOffer.numberOfApplications)}</p>
                        : null
                    }
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