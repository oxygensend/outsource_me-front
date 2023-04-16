import { InputProfile } from '../Input/InputProfile';
import { Textarea } from '../Input/Textarea';
import { SubmitButton } from '../Button/SubmitButton';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import authAxios from '../../services/authAxios';
import { API_URL } from '../../config';

export const EditProfileDescriptionForm = ({ personalData }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            description: personalData.description,
        },
    });
    const [errors, setErrors] = useState(null);

    const descriptionLabel =
        personalData.accountType === 'Principle'
            ? 'Napisz czym się chcesz podzielić'
            : 'Informacje tutaj zawarte bedą wyświetlanie w karcie oferty zlecenia. Możesz napisać o swoim osiągnieciach, wykształceniu, czego aktualnie poszukujesz.';

    const onSubmit = async (data) => {
        authAxios
            .patch(API_URL + '/users/' + personalData.id, data, {
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                },
            })
            .then((data) => {
                window.location.href = '/profil/me';
                window.flash('Opis został zmieniony', 'success');
            })
            .catch((e) => {
                if (e.response.status === 422) {
                    setErrors(e.response.data.violations);
                }
            });
    };

    const findErrors = (property) => {
        return errors ? errors.find((el) => el.propertyPath === property) : null;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
                name={'description'}
                placeholder={'Dodaj opis'}
                label={descriptionLabel}
                register={register}
                required={false}
                error={findErrors('description')}
            />

            <SubmitButton class={'edit-button mb-4'} value={'Zmień'} />
        </form>
    );
};
