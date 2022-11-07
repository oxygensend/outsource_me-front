import calendar from "../../assets/icons/calendar.png";
import moment from "moment";
import {ButtonLink} from "../Button/ButtonLink";
import arrow_right from "../../assets/icons/arrow-right.png";
import close_icon from "../../assets/icons/trashcan.png";
import show from "../../assets/icons/search.png";
import React from "react";

export const ApplicationCard = ({application, id, onClickDelete, onClickPreview}) => {


    return (
        <div key={id}
             className={'application flex justify-between ' + (application.status ? 'application-active' : 'application-deactivated')}>
            <div>
                <div className="flex items-center">
                    <div className="text-xl font-medium text-gray-900">
                        <p>{application.jobOffer.name}</p>
                    </div>

                </div>
                <div className={"flex flex-row gap-2 mt-4"}>
                    <img src={calendar} alt={"calendar"} style={{maxHeight: '16px'}}/>
                    <p className={"font-time italic bottom-0.5 relative"}>Aplikowano {moment(application.createdAt).fromNow()} </p>
                    <img src={show}
                         className={" cursor-pointer mt-0.2 mobile-hide2"}
                         alt={"delete"}
                         style={{maxHeight: '17px', maxWidth: '17px'}}
                         width={20}
                         onClick={() => onClickPreview()}
                    />
                    {application.status ?
                        <img src={close_icon}
                             className={" cursor-pointer bottom-1 mobile-hide2"}
                             alt={"delete"}
                             style={{maxHeight: '19px'}}
                             width={20}
                             onClick={() => onClickDelete()}
                        /> : null}

                </div>
            </div>

            <ButtonLink
                class={"outsourceme_button outsource_takeOff  mt-5  md:mb-4 md:mt-0 mobile-hide2 "}
                value={"Przejdź do oferty"}
                route={"/oferty-zlecen/" + application.jobOffer.slug}
            />
            <div className={"mt-2 lg-hide"}>

                <img src={show}
                     className={" cursor-pointer mt-0.2"}
                     alt={"delete"}
                     style={{maxHeight: '17px', maxWidth: '17px'}}
                     width={20}
                     onClick={() => onClickPreview()}
                />
                {application.status ?
                    <img src={close_icon}
                         className={"mb-1 mt-1 cursor-pointer"}
                         alt={"usun"}
                         style={{maxHeight: '16px'}}
                         width={20}
                         onClick={() => onClickDelete()}

                    /> : null}

                <img src={arrow_right} style={{maxWidth: '18px', maxHeight: '18px'}}/>
            </div>
        </div>
    );
}