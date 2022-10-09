import './index.css'
import '../../Components/WelcomeBoard/WelcomeBoard.css'
import React from "react";
import {LoginForm} from "../../Components/Forms/LoginForm";
import {HomeImage} from "../../Components/WelcomeBoard/HomeImage";

export class Login extends React.Component {
    render() {
        return (
            <div className={"home h-full"}>
                <HomeImage/>
                <div className={"right-content justify-center"}>

                    <LoginForm/>
                </div>
            </div>);
    }
}

