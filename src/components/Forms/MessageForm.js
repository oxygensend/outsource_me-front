import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { SubmitButton } from '../Button/SubmitButton';
import RichText from '../Input/RichText';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { InputProfile } from '../Input/InputProfile';
import authAxios from '../../services/authAxios';
import { API_URL } from '../../config';
import { closeModal } from '../../services/utils';
import tokenService from '../../services/tokenService';

export const MessageForm = ({ userId, setShowModals }) => {
    const { register, handleSubmit, control } = useForm({
        defaultValues: { DraftJS: EditorState.createEmpty() },
    });
    const [errors, setErrors] = useState(null);

    const onSubmit = async (data) => {
        console.log(userId)
        authAxios
            .post(API_URL + '/mail-messages', {
                subject: data.subject,
                body: stateToHTML(data.DraftJS.getCurrentContent()),
                recipientId: userId,
                senderId: tokenService.getUserId()
            })
            .then((data) => {
                closeModal('messageModal', setShowModals);
                window.flash('Wiadomość została wysłana', 'success');
            })
            .catch((e) => {
                console.log(e);
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
                name={'subject'}
                placeholder={'Oferta pracy'}
                type={'text'}
                label={'Temat *'}
                className={'input-field-second'}
                register={register}
                required={true}
                error={findErrors('subject')}
            />

            <label className={'input-label'}>
                Wiadomość zostanie dostarczona przez skrzynke pocztową. Tam też spodziewaj się odpowiedzi
            </label>
            <RichText control={control} placeholder={'Napisz wiadomość'} />

            <SubmitButton class={'edit-button'} value={'Wyślij'} />
        </form>
    );
};
