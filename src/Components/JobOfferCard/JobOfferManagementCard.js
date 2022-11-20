import calendar from "../../assets/icons/calendar.png";
import moment from "moment";
import React from "react";
import {applicationsStringPluralForm} from "../../services/utils";

export const JobOfferManagementCard = ({jobOffer}) => {

    const moveToManagementPage = () => {
        window.location.href = window.location.pathname + '/' + jobOffer.slug;
    }

    return (
        <div
             className={'application flex justify-between cursor-pointer ' + (!jobOffer.archived ? 'application-active' : 'application-deactivated')}
             onClick={() => moveToManagementPage()}
        >
            <div>
                <div className="flex items-center">
                    <div className="text-xl font-medium text-gray-900">
                        <p>{jobOffer.name}</p>
                    </div>
                </div>

                <p className={"application-font"}>{jobOffer.numberOfApplications + applicationsStringPluralForm(jobOffer.numberOfApplications)}</p>
                <div className={"flex flex-row gap-2 mt-4"}>
                    <img src={calendar} alt={"calendar"} style={{maxHeight: '16px'}}/>
                    <p className={"font-time italic bottom-0.5 relative"}>
                        {jobOffer.validTo ? "Oferta wygasa " + moment(jobOffer.validTo).fromNow() :
                            "Brak daty wygasniecia oferty"} </p>
                </div>
            </div>


        </div>
    );
}