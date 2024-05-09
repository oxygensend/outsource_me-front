import { ModalWrapper } from './ModalWrapper';
import React, { useState } from 'react';
import { LanguageForm } from '../Forms/LanguageForm';
import authAxios from '../../services/authAxios';
import { API_URL } from '../../config';
import tokenService from '../../services/tokenService';

export const AddLanguagesModal = ({ universitiesList, setShowModals }) => {
    const request = async (data) => {
        return authAxios.post(API_URL + '/users/' + tokenService.getUserId() +  '/languages', data);
    };
    const afterSubmit = () => {
        window.location.href = '/profil/me';
        window.flash('Nowy język został pomyślnie dodany', 'success');
    };
    return (
        <ModalWrapper title={'Dodaj język'} setShowModals={setShowModals} prop={'languages'} type={'edit'}>
            <LanguageForm afterSubmit={afterSubmit} request={request} />
        </ModalWrapper>
    );
};
