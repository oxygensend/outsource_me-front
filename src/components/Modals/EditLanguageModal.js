import { ModalWrapper } from './ModalWrapper';
import React from 'react';
import { LanguageForm } from '../Forms/LanguageForm';
import authAxios from '../../services/authAxios';
import { API_URL } from '../../config';

export const EditLanguageModal = ({ setShowModals, language, languages }) => {
    const request = async (data) => {
        return authAxios.patch(API_URL + '/languages/' + language.id, data, {
            headers: {
                'Content-Type': 'application/merge-patch+json',
            },
        });
    };

    const afterSubmit = (data) => {
        const index = languages.indexOf(language);
        languages[index] = data.data;
        setShowModals({ languages: false });
        window.flash('Język został zaktualizowany', 'success');
    };

    return (
        <ModalWrapper
            title={'Edytuj informacje o danym języku'}
            setShowModals={setShowModals}
            prop={'languages'}
            type={'edit'}
        >
            <LanguageForm language={language} request={request} afterSubmit={afterSubmit} buttonName={'Edytuj'} />
        </ModalWrapper>
    );
};
