import { ModalWrapper } from './ModalWrapper';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { getData } from '../../services/utils';
import moment from 'moment/moment';
import calendar from '../../assets/icons/calendar.png';
import { ButtonLink } from '../Button/ButtonLink';
import authAxios from '../../services/authAxios';

const fileDownload = require('js-file-download');
export const ApplicationPreviewModal = ({ application, setShowModals }) => {
    const [selectedApplication, setSelectedApplication] = useState(null);
    useEffect(() => {
        return () => {
            getData('/applications/' + application.id + "/info").then((data) => setSelectedApplication(data));
        };
    }, []);

    const onClickDownloadAttachment = (attachment) => {
        authAxios("/attachments/" + attachment.id, {
            responseType: 'arraybuffer',
        }).then((data) => {
            fileDownload(data.data, attachment.originalName);
        });
    };

    if (selectedApplication) {
        return (
            <ModalWrapper
                title={parse(`Aplikacja na stanowisko <b>` + selectedApplication.jobOffer.name + `</b>`)}
                titleCenter={true}
                setShowModals={setShowModals}
                prop={'previewApplication'}
                type={'preview'}
            >
                <p className={'text-red-700 text-lg font-bold'}>Wiadomość do zleceniodawcy</p>
                <p className={'text-sm italic font-gray pl-2'}>
                    {selectedApplication.description ?? 'Brak wiadomości'}
                </p>

                <p className={'text-red-700 text-lg font-bold mt-4'}>Dołączone pliki</p>
                {selectedApplication.attachments ? (
                    selectedApplication.attachments.map((file, i) => {
                        return (
                            <p
                                className={'pl-2 cursor-pointer hover:underline'}
                                onClick={() => onClickDownloadAttachment(file)}
                                key={i}
                            >
                                {file.originalName}
                            </p>
                        );
                    })
                ) : (
                    <p className={'text-sm italic font-gray pl-2 '}>{'Brak załączników'}</p>
                )}
                <div className={'md:flex md:flex-row justify-between  relative '}>
                    <div className={'flex flex-row gap-2 mt-10 relative'}>
                        <img src={calendar} alt={'calendar'} style={{ maxHeight: '16px' }} />
                        <p className={'font-time italic bottom-0.5 relative'}>
                            Aplikowano {moment(application.createdAt).fromNow()}{' '}
                        </p>
                    </div>
                    <ButtonLink
                        class={'outsourceme_button outsource_takeOff '}
                        value={'Przejdź do oferty'}
                        route={'/oferty-zlecen/' + application.jobOffer.slug}
                    />
                </div>
            </ModalWrapper>
        );
    } else {
        return null;
    }
};
