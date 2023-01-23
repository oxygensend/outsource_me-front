import {ButtonLink} from "../Button/ButtonLink";
import calendar from '../../assets/icons/calendar.png';
import moment from "moment";
import tokenService from "../../services/tokenService";

export const ApplicationBox = ({jobOffer}) => {
    const salaryRange = jobOffer.salaryRange ?
        (jobOffer.salaryRange.salaryRange + (jobOffer?.salaryRange?.type ? ' (' + jobOffer.salaryRange.type + ')' : null)) :
        "Nie podano";

    return (
        <div className={"application-box"}>
            <div className={"box-wrapper"}>
                <div>
                    <p className={"font-type"}>Wynagrodzenie:</p>
                    <p className={"font-info"}>{salaryRange}</p>
                    <p className={"font-type mt-2"}>Lokalizacja:</p>
                    <p className={"font-info"}>{jobOffer?.address?.city ?? 'Zdalnie'}</p>
                </div>
                {jobOffer.archived || tokenService.checkIfMe(jobOffer.user.id) ? null :
                    <ButtonLink
                        class={"application-button2"}
                        value={"Aplikuj"}
                        route={'/oferty-zlecen/' + jobOffer.slug + '/aplikuj'}
                        state={jobOffer}
                    />
                }
            </div>
            <div className={"flex flex-row gap-2 mt-4"}>
                <img src={calendar} alt={"calendar"}/>

                <p className={"font-time italic"}>
                    {jobOffer.validTo ?
                        "Do wygasniecia oferty pozostalo " + moment(jobOffer.validTo).diff(Date(), 'days') + " dni"
                        : "Brak daty wygaśnięcia oferty"
                    }
                </p>
            </div>
        </div>
    );
}