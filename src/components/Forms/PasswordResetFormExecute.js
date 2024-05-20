import { Input } from '../Input/Input';
import { SubmitButton } from '../Button/SubmitButton';
import React, { useState } from 'react';
import AuthService from '../../services/authService';
import './Form.css';
import { useSearchParams } from 'react-router-dom';

export const PasswordResetFormExecute = (props) => {
    const [password, setPassword] = useState(null);
    const [errors, setErrors] = useState(null);
    const [response, setReponse] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams(window.location.search);

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        setPassword(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            newPassword: password,
            token: searchParams.get('token'),
        };

        setErrors(null);
        setPassword(null);

        AuthService.resetPassword(data)
            .then((response) => {
                if (response.status === 200) {
                    setReponse(response.data);
                    window.location.href = '/logowanie';
                }
            })
            .catch((err) => {
                if (err.response.status === 400 || err.response.status === 400) {
                    setErrors(err.response.data.detail);
                }
            });
    };
    return (
        <form className={'login-content '} onSubmit={handleSubmit}>
            <div className={'login-title mt-6 '}>
                <p>Reset hasła</p>
            </div>
            <div className={'flex flex-col gap-2 '}>
                <Input
                    name={'password'}
                    label={'Podaj nowe hasło'}
                    type={'password'}
                    placeholder={'***** ***'}
                    required={true}
                    value={password}
                    onChange={handleInputChange}
                    error={errors}
                />

                <SubmitButton class={'button-login2 justify-center cursor-pointer'} value={'Zmień hasło'} />
            </div>
        </form>
    );
};
