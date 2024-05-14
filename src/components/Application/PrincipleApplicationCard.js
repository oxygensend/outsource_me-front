import calendar from '../../assets/icons/calendar.png';
import moment from 'moment';
import show from '../../assets/icons/search.png';
import approve from '../../assets/icons/circle-check-fill-24.svg';
import decline from '../../assets/icons/circle-x-fill-24.svg';
import React from 'react';

export const PrincipleApplicationCard = ({ application, id, onClickReject, onClickAccept, jobOfferStatus }) => {
    const onClickShowApplication = () => {
        window.location.href = window.location.pathname + '/aplikacja/' + application.id;
    };

    return (
        <div
            key={id}
            className={
                'application flex justify-between mb-4 ' +
                (application.status === 'ACCEPTED' ? 'application-active' : 'application-deactivated')
            }
        >
            <div>
                <div className='flex items-center'>
                    <div className='text-xl font-medium text-gray-900 flex flex-row gap-2'>
                        <p>{application.applierFullName}</p>
                        <img
                            src={show}
                            className={' cursor-pointer mt-1'}
                            alt={'delete'}
                            style={{ maxHeight: '17px', maxWidth: '17px' }}
                            width={20}
                            onClick={() => onClickShowApplication()}
                        />
                    </div>
                </div>
                <div className={'flex flex-row gap-2 mt-4'}>
                    <img src={calendar} alt={'calendar'} style={{ maxHeight: '16px' }} />
                    <p className={'font-time italic bottom-0.5 relative'}>
                        Przesłano {moment(application.createdAt).fromNow()}{' '}
                    </p>
                </div>
            </div>

            <div className={' flex flex-row gap-2 items-center'}>
                {jobOfferStatus ? null : (
                    <>
                        {application.status != 'ACCEPTED' ? (
                            <img
                                src={approve}
                                className={' cursor-pointer'}
                                alt={'approve'}
                                style={{ maxHeight: '24px', maxWidth: '24px' }}
                                width={24}
                                height={24}
                                onClick={() => (application.status == 'REJECTED' ? onClickAccept() : onClickReject())}
                            />
                        ) : null}

                        {application.status != 'REJECTED' ? (
                            <img
                                src={decline}
                                className={' cursor-pointer'}
                                alt={'usun'}
                                style={{ maxHeight: '24px', maxWidth: '24px' }}
                                width={24}
                                height={24}
                                onClick={() => (application.status == 'ACCEPTED' ? onClickReject() : onClickAccept())}
                            />
                        ) : null}
                    </>
                )}
            </div>
        </div>
    );
};
