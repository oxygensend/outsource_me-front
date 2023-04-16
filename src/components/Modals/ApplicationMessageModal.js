import { ModalWrapper } from './ModalWrapper';
import parse from 'html-react-parser';
import React from 'react';
import { onClickShowModal } from '../../services/utils';
import { Button } from '../Button/Button';

export const ApplicationMessageModal = ({ application, setShowModals }) => {
    return (
        <ModalWrapper
            title={parse(`Wiadomość od  <b>` + application.applying_person.fullName + `</b>`)}
            titleCenter={true}
            setShowModals={setShowModals}
            prop={'applicationMessageModal'}
            type={'preview'}
        >
            <p className={'text-sm italic font-gray pl-2'}>{application.description}</p>
            <Button
                className={'application-button2'}
                value={'Skontaktuj się'}
                onClick={() => onClickShowModal('messageModal', setShowModals)}
            />
        </ModalWrapper>
    );
};
