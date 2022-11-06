import './JobOfferCard.css';
import {SERVER_URL} from "../../config";
import bookmark from '../../assets/icons/Bookmark.png'
import {ButtonLink} from "../Button/ButtonLink";
import React, {useState} from "react";

export const JobOfferCard = ({jobOffer}) => {

    const [showWholeDescription, setShowWholeDescription] = useState(false);
    return (

        <div className={"card mb-5"}>
            <div className={"grid grid-cols-12 md:flex md:flex-row md:justify-between md:ml-8 md:mr-8"}>

                <div className={"flex flex-row  gap-3 col-start-2 md:col-start-1 col-span-7 mt-2  "}>
                    <img src={SERVER_URL + '/' + jobOffer.user.imagePath} width={54} height={54}
                         className={"rounded-2xl border-2  "} alt={"avatar"}/>

                    <div>
                        <p className={"fullname-font "}>{jobOffer.user.fullName}</p>
                        <p className={"company-font"}>Apple</p>
                    </div>
                </div>

                <div className={"col-start-11 mt-3 md:col-start-12 mt-5"}>
                    <img src={bookmark} alt={"bookmark"}/>
                </div>
            </div>

            <div className={"grid grid-cols-12 mt-5"}>

                <div className={"col-start-2 col-end-12"}>
                    <h1 className={"text-lg font-bold mb-1"}>{jobOffer.name}</h1>
                    {!showWholeDescription ?
                        <p>{jobOffer.shortDescription} </p> : <p>{jobOffer.description}</p>
                    }

                    <p
                        className={"underline cursor-pointer text-blue-700 hover:text-blue-500 no-underline "
                            + (showWholeDescription ? "hidden" : "block")}
                        onClick={() => setShowWholeDescription(true)}
                    >
                        Pokaż więcej... </p>
                </div>
            </div>

            <div className={"grid grid-cols-12 mt-5 md:flex md:flex-row md:justify-between md:ml-8 md:mr-8 "}>

                <div className={"application-font col-start-2 md:mt-2 col-span-6"}>
                    <p>{jobOffer.numberOfApplications + ' aplikacje'}</p>
                </div>

                <ButtonLink
                    class={"application-button mt-5  md:mb-4 md:mt-0 col-span-full"}
                    value={"Aplikuj"}
                    route={"/oferty-zlecen/" + jobOffer.slug}
                    state={jobOffer}
                />
            </div>

        </div>

    )
        ;

}