import {HomeImage} from "../../components/WelcomeBoard/HomeImage";
import React from "react";
import {PasswordResetFormExecute} from "../../components/Forms/PasswordResetFormExecute";

export const PasswordReset = (props) => {

    return (
        <div className={"home h-full"}>
            <HomeImage/>
            <div className={"right-content justify-center"}>

                <PasswordResetFormExecute/>
            </div>
        </div>
    );
}