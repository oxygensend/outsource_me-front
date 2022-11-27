import {SERVER_URL} from "../../config";
import React from "react";
import {ButtonLink} from "../Button/ButtonLink";

export const UserSmallCard = ({user,  className}) => {

    return (
        <div className={"job-offer " + className ?? null}>
            <div className={"flex  flex-row justify-between ml-8 mr-8"}>

                <div className={"flex flex-row  gap-3 col-start-2 md:col-start-1 col-span-7 mt-2  "}>
                    <img src={SERVER_URL + '/' + user.imagePath}
                         style={{height: '50px', width: '50px'}}
                         className={"rounded-2xl border-2  "} alt={"avatar"}/>

                    <div>
                        <p className={"fullname-font "}>{user.fullName}</p>
                        <p className={"company-font"}>{user.activeJobPosition}</p>
                    </div>
                </div>

            </div>

            <div
                className={"grid grid-cols-12 mt-5 md:mt-0 md:flex md:flex-row md:justify-between md:ml-8 md:mr-8 "}>

                <div className={"application-font col-start-2  col-span-6"}>

                </div>

                <ButtonLink
                    class={"application-button md:mb-4  col-span-full"}
                    value={"Pokaż profil"}
                    route={"/profil/" + user.id}
                />

            </div>
        </div>
    );
}