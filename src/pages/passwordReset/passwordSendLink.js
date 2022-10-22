import {HomeImage} from "../../Components/WelcomeBoard/HomeImage";
import React from "react";
import {PasswordResetSendLinkForm} from "../../Components/Forms/PasswordResetSendLinkForm";

export const PasswordSendLink = (props) => {

    return (
        <div className={"home h-full"}>
            <HomeImage/>
            <div className={"right-content justify-center"}>

                <PasswordResetSendLinkForm/>
            </div>
        </div>
    );
}