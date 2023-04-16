import { ModalWrapper } from './ModalWrapper';
import React, { useState } from 'react';
import { MessageForm } from '../Forms/MessageForm';

export const ContactModal = ({ setShowModals, userIri }) => {
    return (
        <ModalWrapper title={'Napisz wiadomość'} setShowModals={setShowModals} prop={'messageModal'} type={'edit'}>
            <MessageForm userIri={userIri} setShowModals={setShowModals} />
        </ModalWrapper>
    );
};
