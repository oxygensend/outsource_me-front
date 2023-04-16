import { ModalWrapper } from './ModalWrapper';
import React, { useState } from 'react';
import { EditProfileDescriptionForm } from '../Forms/EditProfileDescriptionForm';

export const EditDescriptionModal = ({ setShowModals, personalData }) => {
    if (personalData) {
        return (
            <ModalWrapper title={'O mnie'} setShowModals={setShowModals} prop={'description'} type={'edit'}>
                <EditProfileDescriptionForm personalData={personalData} />
            </ModalWrapper>
        );
    } else {
        return null;
    }
};
