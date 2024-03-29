import { ModalWrapper } from './ModalWrapper';
import React, { useEffect, useState } from 'react';
import { AddEducationForm, EducationForm } from '../Forms/EducationForm';
import authAxios from '../../services/authAxios';
import { API_URL } from '../../config';

export const AddExpirienceModal = ({ setShowModals }) => {
    const request = async (data) => {
        return authAxios.post(API_URL + '/education', data);
    };

    const afterSubmit = () => {
        window.location.href = '/profil/me';
        window.flash('Uczelnia została dodana', 'success');
    };

    return (
        <ModalWrapper title={'Dodaj wykształcenie'} setShowModals={setShowModals} prop={'education'} type={'edit'}>
            <EducationForm request={request} afterSubmit={afterSubmit} />
        </ModalWrapper>
    );
};
