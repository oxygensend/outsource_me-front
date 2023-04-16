import { ModalWrapper } from './ModalWrapper';
import React from 'react';
import { EditUserPersonalInfoForm } from '../Forms/EditUserPersonalInfoForm';

export const EditPersonalInfoModal = ({ personalData, setShowModals }) => {
    if (personalData) {
        return (
            <ModalWrapper
                title={'Edytuj informacje o sobie'}
                setShowModals={setShowModals}
                prop={'personalInfo'}
                type={'edit'}
            >
                <EditUserPersonalInfoForm personalData={personalData} />
            </ModalWrapper>
        );
    } else {
        return null;
    }
};
