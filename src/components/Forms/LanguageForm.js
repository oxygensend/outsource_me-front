import { InputProfile } from '../Input/InputProfile';
import { Textarea } from '../Input/Textarea';
import { SubmitButton } from '../Button/SubmitButton';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import authAxios from '../../services/authAxios';
import { API_URL } from '../../config';

export const LanguageForm = ({ language, request, afterSubmit, buttonName }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: language?.name ?? null,
            description: language?.description ?? null,
        },
    });
    const [errors, setErrors] = useState(null);

    const onSubmit = async (data) => {
        request(data)
            .then((data) => {
                afterSubmit(data);
            })
            .catch((e) => {
                if (e.response.status === 400) {
                    setErrors(e.response.data.subExceptions);
                }
            });
    };

    const findErrors = (property) => {
        return errors ? errors.find((el) => el.field === property) : null;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputProfile
                name={'name'}
                placeholder={'Np. Angielski'}
                type={'text'}
                label={'Język *'}
                className={'input-field-second'}
                register={register}
                required={true}
                error={findErrors('name')}
            />

            <Textarea
                name={'description'}
                placeholder={'Dodaj opis'}
                label={'Opis'}
                register={register}
                required={false}
                error={findErrors('description')}
            />

            <SubmitButton class={'edit-button'} value={buttonName ?? 'Dodaj'} />
        </form>
    );
};
