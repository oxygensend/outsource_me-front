import { Checkbox } from '../Input/Checkbox';
import { Input } from '../Input/Input';
import { GoogleButton } from '../Button/GoogleButton';
import { SubmitButton } from '../Button/SubmitButton';
import React, { useRef } from 'react';
import { API_URL } from '../../config';
import axios from 'axios';
import './Form.css';
import AuthService from '../../services/authService';

export class RegistrationForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            developerChecked: true,
            principalChecked: false,
            email: null,
            name: null,
            surname: null,
            password: null,
            passwordConfirmation: null,
            errors: null,
            successfulResponse: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getFormData() {
        const { developerChecked, principalChecked, errors, successfulResponse,  ...data } = this.state;
        data.accountType = developerChecked ? 'DEVELOPER' : 'PRINCIPLE';
        console.log(data)
        return data;
    }

    onChangeCheckboxHandler(stateOne, stateTwo) {
        this.setState({ developerChecked: !stateOne });
        this.setState({ principalChecked: !stateTwo });
    }

    onChangeDeveloperCheckbox() {
        if (!this.state.developerChecked)
            this.onChangeCheckboxHandler(this.state.developerChecked, this.state.principalChecked);
    }

    onChangePrincipalCheckbox() {
        if (!this.state.principalChecked)
            this.onChangeCheckboxHandler(this.state.developerChecked, this.state.principalChecked);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    findErrors(property) {
        console.log(this.state.errors)
        return this.state.errors?.subExceptions ? this.state.errors.subExceptions.find((el) => el.field === property) : null;
    }

    findDuplicatedEmailError(){
        return this.state.errors ? this.state.errors.message : null;
    }

    clearPasswordInputs() {
        this.setState({
            password: '',
            passwordConfirmation: '',
            email: '',
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        const data = this.getFormData();

        this.setState({ errors: null });

        AuthService.register(data)
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    this.setState({ successfulResponse: response.data });
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    console.log(err.response.data)
                    this.setState({ errors: err.response.data});
                    this.clearPasswordInputs();
                }
            });
    }

    resendEmailVerificationEmail() {
        axios
            .post(API_URL + this.state.successfulResponse.resendEmailVerificationLink, {
                email: this.state.successfulResponse.email,
            })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ emailResent: true });
                }
            })
            .catch((err) => {
                throw Error('COS SIE STALO');
            });
    }

    render() {
        if (this.state.successfulResponse) {
            return (
                <div className={'login-content success'}>
                    <p className={''}> {this.state.successfulResponse.message}</p>

                    {this.state.emailResent ? (
                        <p> Email został przesłany ponownie </p>
                    ) : (
                        <p
                            className={'underline cursor-pointer text-blue-700 hover:text-blue-500'}
                            onClick={() => this.resendEmailVerificationEmail()}
                        >
                            Prześlij email jeszcze raz
                        </p>
                    )}
                </div>
            );
        } else {
            return (
                <form className={'login-content '} onSubmit={this.handleSubmit} action={API_URL + '/register'}>
                    {!this.state.successfulResponse ? (
                        <div className={'login-title mt-6 '}>
                            <p>Dołącz do nas</p>
                        </div>
                    ) : null}

                    {!this.state.successfulResponse ? (
                        <div className={'flex flex-col gap-2 '}>
                            <div className={'flex flex-col align-middle justify-center '}>
                                <p className={'flex'}> Wybierz rodzaj konta</p>
                                <div className={'flex flex-row mb-8 justify-center '}>
                                    <Checkbox
                                        name={'developerChecked'}
                                        label={'Developer'}
                                        class={'mb-4'}
                                        checked={this.state.developerChecked}
                                        onChange={() => this.onChangeDeveloperCheckbox()}
                                    />
                                    <Checkbox
                                        name={'principalChecked'}
                                        label={'Zleceniodawca'}
                                        class={'mb-4'}
                                        checked={this.state.principalChecked}
                                        onChange={() => this.onChangePrincipalCheckbox()}
                                    />
                                </div>
                            </div>
                            <Input
                                name={'email'}
                                label={'Email'}
                                type={'text'}
                                placeholder={'test@test.com'}
                                class={'mb-4'}
                                required={true}
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                error={this.findDuplicatedEmailError()}
                            />
                            <Input
                                name={'name'}
                                label={'Imie'}
                                type={'text'}
                                placeholder={'Marek'}
                                class={'mb-4'}
                                required={true}
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                error={this.findErrors('name')}
                            />

                            <Input
                                name={'surname'}
                                label={'Nazwisko'}
                                type={'text'}
                                placeholder={'Mostowiak'}
                                class={'mb-4'}
                                required={true}
                                value={this.state.surname}
                                onChange={this.handleInputChange}
                                error={this.findErrors('surname')}
                            />
                            <Input
                                name={'password'}
                                label={'Hasło'}
                                type={'password'}
                                placeholder={'********'}
                                class={'mb-4'}
                                required={true}
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                error={this.findErrors('password')}
                            />
                            <Input
                                name={'passwordConfirmation'}
                                label={'Potwierdź hasło'}
                                type={'password'}
                                placeholder={'********'}
                                class={'mb-4'}
                                required={true}
                                value={this.state.passwordConfirmation}
                                onChange={this.handleInputChange}
                                error={this.findErrors(null)}
                            />

                            <GoogleButton>Dołącz przez Google</GoogleButton>
                            <SubmitButton
                                class={'button-login2 justify-center cursor-pointer'}
                                value={'Zarejestruj się'}
                            />
                        </div>
                    ) : (
                        <div className={'flex success'}>
                            <p className={''}> {this.state.successfulResponse.message}</p>
                        </div>
                    )}
                </form>
            );
        }
    }
}
