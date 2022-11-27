import {Input} from "../Input/Input";
import {GoogleButton} from "../Button/GoogleButton";
import {SubmitButton} from "../Button/SubmitButton";
import React from "react";
import {API_URL} from "../../config";
import './Form.css'
import AuthService from "../../services/authService";
import tokenService from "../../services/tokenService";

export class LoginForm extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            password: '',
            errors: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    getFormData() {
        const {errors, ...data} = this.state
        return data;
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    clearPasswordInputs() {

        this.setState({
            password: '',
            email: ''
        });
    }


    async handleSubmit(event) {

        event.preventDefault();

        const data = this.getFormData();

        this.setState({errors: null, password: null});
        this.clearPasswordInputs()

        AuthService.login(data)
            .then(response => {
                if (response.status === 201 || response.status === 200) {
                    this.setState({successfulResponse: response.data})
                    tokenService.setLocalAccessToken(response.data.token)
                    tokenService.setLocalRefreshToken(response.data.refresh_token)
                    window.location.href = '/';
                }
            }).catch(err => {
            if (err.response.status === 401) {
                this.setState({errors: err.response.data})

            }
        })


    }

    render() {
        return (
            <form
                className={"login-content "}
                onSubmit={this.handleSubmit}
                action={API_URL + "/login"}
            >
                <div className={"login-title mt-6 "}>
                    <p>Zaloguj się</p>
                </div>
                <div className={"flex flex-col gap-2 "}>

                    <Input
                        name={"email"}
                        label={"Email"}
                        type={"text"}
                        placeholder={"test@test.com"}
                        class={"mb-2"}
                        required={true}
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />

                    <Input
                        name={"password"}
                        label={"Hasło"}
                        type={"password"}
                        placeholder={"***** ***"}
                        required={true}
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        error={this.state.errors}
                    />
                    <div className={"flex order-2 relative bottom-10"}>
                        <a className={"underline cursor-pointer text-blue-700 hover:text-blue-500"} href={"/odzyskiwanie-hasla-email"}
                        >Zapomniałeś hasła? </a>
                    </div>
                    <GoogleButton>
                        Zaloguj się przez Google
                    </GoogleButton>
                    <SubmitButton
                        class={"button-login2 justify-center cursor-pointer"}
                        value={"Zaloguj się"}
                    />
                </div>

            </form>
        );
    }
}