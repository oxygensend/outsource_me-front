import { Input } from '../Input/Input';
import { SubmitButton } from '../Button/SubmitButton';
import React, { useState } from 'react';
import AuthService from '../../services/authService';
import './Form.css';

export const PasswordResetSendLinkForm = (props) => {
    const [email, setEmail] = useState(null);
    const [errors, setErrors] = useState(null);
    const [response, setResponse] = useState(null);

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        setEmail(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email: email,
        };

        setErrors(null);
        setEmail(null);

        AuthService.sendResetPasswordLink(data)
            .then((response) => {
                if (response.status === 200) {
                    setResponse(response.data);
                }
            })
            .catch((err) => {
                if (err.response.status === 422 || err.response.status === 400) {
                    setErrors(err.response.data.detail);
                }
            });
    };
    if (response) {
        return (
            <div className={'login-content success'}>
                <p className={''}> {response.description}</p>
                <p
                    className={'underline cursor-pointer text-blue-700 hover:text-blue-500'}
                    onClick={() => setResponse(null)}
                >
                    Spróbuj jeszcze raz{' '}
                </p>
            </div>
        );
    } else {
        return (
            <form className={'login-content '} onSubmit={handleSubmit}>
                <div className={'login-title mt-6 '}>
                    <p>Wprowadź twój adres email</p>
                </div>
                <div className={'flex flex-col gap-2 '}>
                    <Input
                        name={'email'}
                        label={''}
                        type={'email'}
                        placeholder={'test@test.com'}
                        required={true}
                        value={email}
                        onChange={handleInputChange}
                        error={errors}
                    />

                    <SubmitButton class={'button-login2 justify-center cursor-pointer'} value={'Prześlij email'} />
                </div>
            </form>
        );
    }
};
