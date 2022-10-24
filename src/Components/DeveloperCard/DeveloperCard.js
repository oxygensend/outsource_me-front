import avatar from "../../assets/images/avatar.png";
import bookmark from "../../assets/icons/Bookmark.png";
import {ButtonLink} from "../Button/ButtonLink";
import './DeveloperCard.css';

export const DeveloperCard = (props) => {
    return (
        <div className={"card mb-5"}>
            <div className={"grid grid-cols-12 md:flex md:flex-row md:justify-between md:ml-8 md:mr-8"}>

                <div className={"flex flex-row  gap-3 col-start-2 md:col-start-1 col-span-7 mt-2  "}>
                    <img src={avatar} width={54} height={54}
                         className={"rounded-2xl border-2  "} alt={"avatar"}/>

                    <div>
                        <p className={"fullname-font "}>Karim Saif</p>
                        <p className={"company-font"}>Apple</p>
                    </div>
                </div>

                <div className={"col-start-11 mt-3 md:col-start-12 mt-5"}>
                    <img src={bookmark} alt={"bookmark"}/>
                </div>
            </div>

            <div className={"grid grid-cols-12 mt-5"}>

                <div className={"col-start-2 col-end-12"}>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                        type
                        and... </p>
                    <p>pokaż więcej</p>
                </div>
            </div>

            <div className={"mt-5 md:flex md:flex-row  md:ml-8 md:mr-8 md:justify-end"}>



                <ButtonLink class={"developer-button mt-5  md:mb-4 md:mt-0 col-span-full"} value={"Pokaż profil"}/>
            </div>

        </div>
    );
}