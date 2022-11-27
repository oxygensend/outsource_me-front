import {HomeImage} from "../../components/WelcomeBoard/HomeImage";
import '../login/index.css'
import './index.css'
import '../../components/WelcomeBoard/WelcomeBoard.css'
import React from "react";
import {RegistrationForm} from "../../components/Forms/RegistrationForm";

export class Register extends React.Component {



    render() {
        return (
            <div className={"home h-full"}>
                <HomeImage/>
                <div className={"right-content justify-center"}>

                    <RegistrationForm/>
                </div>
            </div>
        );
    }
}

