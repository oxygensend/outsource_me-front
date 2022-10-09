import {Input} from "../Input/Input";
import {GoogleButton} from "../Button/GoogleButton";
import {Button} from "../Button/Button";
import React from "react";
import {SERVER_URL} from "../../config";
import axios from "axios";
import './Form.css'

export class LoginForm extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            email: null,
            password: null,
            errors: null,
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


    async handleSubmit(event) {

        event.preventDefault();

        const data = this.getFormData();

        this.setState({errors: null, password: null});

        axios.post(event.target.action, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }).then(response => {
            if (response.status === 201 || response.status === 200) {
                this.setState({successfulResponse: response.data})
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
                action={SERVER_URL + "/login"}
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
                        <p className={"underline cursor-pointer text-blue-700 hover:text-blue-500"}
                           onClick={() => this.resendEmailVerificationEmail()}
                        >Zapomniałeś hasła? </p>
                    </div>
                    <GoogleButton>
                        Zaloguj się przez Google
                    </GoogleButton>
                    <Button
                        class={"button-login2 justify-center cursor-pointer"}
                        value={"Zaloguj się"}
                    />
                </div>

            </form>
        );
    }
}