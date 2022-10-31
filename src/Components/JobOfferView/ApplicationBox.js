import {ButtonLink} from "../Button/ButtonLink";
import calendar from '../../assets/icons/calendar.png';

export const ApplicationBox = ({jobOffer}) => {
    console.log(jobOffer);
    return (
        <div className={"application-box"}>
            <p className={"font-type"}>Wynagrodzenie:</p>
            <p className={"font-info"}>15000zl-2000zl</p>
            <p className={"font-type mt-2"}>Lokalizacja:</p>
            <p className={"font-info"}>{jobOffer?.address?.city ?? 'Zdalnie'}</p>
            <ButtonLink
                class={"application-button2"}
                value={"Aplikuj"}
            />
            <div className={"flex flex-row gap-2 mt-4"}>
                <img src={calendar} alt={"calendar"}/>
                <p className={"font-time italic"}>Do wygasniecia oferty pozostalo 4 dni</p>
            </div>
        </div>
    );
}