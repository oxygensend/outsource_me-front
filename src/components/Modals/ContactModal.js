import { ModalWrapper } from './ModalWrapper';
import React, { useState } from 'react';
import { MessageForm } from '../Forms/MessageForm';

export const ContactModal = ({ setShowModals, userId }) => {
    return (
        <ModalWrapper title={'Napisz wiadomość'} setShowModals={setShowModals} prop={'messageModal'} type={'edit'}>
            <MessageForm userId={userId} setShowModals={setShowModals} />
        </ModalWrapper>
    );
};
