import {ButtonLink} from "../Button/ButtonLink";
import calendar from '../../assets/icons/calendar.png';
import moment from "moment";

export const ApplicationBox = ({jobOffer}) => {
    const salaryRange = jobOffer.salaryRange ?
        (jobOffer.salaryRange.salaryRange + (jobOffer?.salaryRange?.type ? ' (' + jobOffer.salaryRange.type + ')' : null)) :
        "Nie podano";

    return (
        <div className={"application-box"}>
            <p className={"font-type"}>Wynagrodzenie:</p>
            <p className={"font-info"}>{salaryRange}</p>
            <p className={"font-type mt-2"}>Lokalizacja:</p>
            <p className={"font-info"}>{jobOffer?.address?.city ?? 'Zdalnie'}</p>
            <ButtonLink
                class={"application-button2"}
                value={"Aplikuj"}
                route={'/oferty_zlecen/' + jobOffer.slug + '/aplikuj'}
            />
            <div className={"flex flex-row gap-2 mt-4"}>
                <img src={calendar} alt={"calendar"}/>
                <p className={"font-time italic"}>Do wygasniecia oferty
                    pozostalo {moment(jobOffer.validTo).diff(Date(), 'days')} dni</p>
            </div>
        </div>
    );
}