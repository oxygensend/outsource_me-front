import React, { useState } from 'react';

export const UserApplicationPage = ({ activeApplications, deactiveApplications }) => {
    const [showActiveApplications, setShowActiveApplications] = useState(false);
    const [showDeactivedApplications, setShowDeactivedApplications] = useState(false);

    return (
        <div className={'applications-wrapper pt-4'}>
            <div className={'text-center text-3xl '}>
                <p>Twoje aplikacje </p>
            </div>

            <hr className={' mt-4 '} style={{ backgroundColor: '#0F528B', opacity: '0.8' }} />

            <div>
                <p className={'font-module mt-5 margin-l '}>
                    {'Aktywne aplikacje(' + activeApplications.length + ')'}{' '}
                </p>
                <div className='flex flex-col mt-5 gap-3 items-center'>
                    {showActiveApplications ? activeApplications : activeApplications.slice(0, 3)}
                </div>
                {activeApplications.length > 3 && !showActiveApplications ? (
                    <p
                        className={'red-font mt-2 margin-l cursor-pointer hover:underline hover:text-red-400'}
                        onClick={() => setShowActiveApplications(true)}
                    >
                        Pokaż wszystkie...
                    </p>
                ) : null}
            </div>

            <div>
                <p className={'font-module mt-5 margin-l '}>
                    {'Wygaśnięte aplikacje(' + deactiveApplications.length + ')'}{' '}
                </p>
                <div className='flex flex-col mt-5 gap-3 items-center'>
                    {showDeactivedApplications ? deactiveApplications : deactiveApplications.slice(0, 3)}
                </div>
                {deactiveApplications.length > 3 && !showDeactivedApplications ? (
                    <p
                        className={'red-font mt-2 mb-2 margin-l cursor-pointer hover:underline hover:text-red-400'}
                        onClick={() => setShowDeactivedApplications(true)}
                    >
                        Pokaż wszystkie...
                    </p>
                ) : null}
            </div>
        </div>
    );
};
