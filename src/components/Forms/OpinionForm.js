import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { SubmitButton } from '../Button/SubmitButton';
import { InputProfile } from '../Input/InputProfile';
import authAxios from '../../services/authAxios';
import { API_URL } from '../../config';

export const OpinionForm = ({ userIri, afterSubmit }) => {
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState(null);

    const onSubmit = async (data) => {
        authAxios
            .post(API_URL + '/opinions', {
                scale: parseInt(data.scale),
                description: data?.description,
                toWho: userIri,
            })
            .then((data) => {
                afterSubmit(data);
            })
            .catch((e) => {
                console.log(e);
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
            <div className={'flex flex-col'}>
                <label className={'input-label'}>Skala (1-5)</label>
                <input
                    className={'w-1/5'}
                    type='range'
                    min={1}
                    max={5}
                    name={'scale'}
                    required={true}
                    {...register('scale')}
                />
            </div>
            <InputProfile
                name={'description'}
                placeholder={'Dodaj komentarz'}
                type={'text'}
                label={'Komentarz'}
                className={'input-field-second'}
                register={register}
                required={true}
                error={findErrors('description')}
            />

            <SubmitButton class={'edit-button'} value={'Dodaj'} />
        </form>
    );
};
