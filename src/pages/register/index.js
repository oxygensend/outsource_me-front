import {HomeImage} from "../../Components/WelcomeBoard/HomeImage";
import '../login/index.css'
import './index.css'
import '../../Components/WelcomeBoard/WelcomeBoard.css'
import React from "react";
import {Button} from "../../Components/Button/Button";
import {GoogleButton} from "../../Components/Button/GoogleButton";
import {Input} from "../../Components/Input/Input";
import {Checkbox} from "../../Components/Input/Checkbox";
import {RegistrationForm} from "../../Components/Forms/RegistrationForm";

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

