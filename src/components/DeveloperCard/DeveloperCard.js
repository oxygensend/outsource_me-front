import avatar from '../../assets/images/avatar.png';
import bookmark from '../../assets/icons/Bookmark.png';
import { ButtonLink } from '../Button/ButtonLink';
import './DeveloperCard.css';
import { SERVER_URL } from '../../config';
import React, { useState } from 'react';

export const DeveloperCard = ({ developer }) => {
    const [showWholeDescription, setShowWholeDescription] = useState(false);

    return (
        <div className={'card mb-5'}>
            <div className={'grid grid-cols-12 md:flex md:flex-row md:justify-between md:ml-8 md:mr-8'}>
                <div className={'flex flex-row  gap-3 col-start-2 md:col-start-1 col-span-7 mt-2  '}>
                    <img
                        src={developer.thumbnailPath}
                        style={{ width: '54px', height: '54px' }}
                        className={'rounded-2xl border-2  '}
                        alt={'avatar'}
                    />

                    <div>
                        <p className={'fullname-font '}>{developer.fullName}</p>
                        <p className={'company-font'}>{developer.thumbnailPath}</p>
                    </div>
                </div>

                <div className={'col-start-11 mt-3 md:col-start-12 mt-5'}>
                    <img src={bookmark} alt={'bookmark'} />
                </div>
            </div>

            <div className={'grid grid-cols-12 mt-5'}>
                <div className={'col-start-2 col-end-12'}>
                    {!showWholeDescription && developer.shortDescription !== developer.description ? <p>{developer.shortDescription} </p> : <p>{developer.description}</p>}

                    {developer.shortDescription && developer.shortDescription != developer.description ? (
                        <p
                            className={
                                'underline cursor-pointer text-blue-700 hover:text-blue-500 no-underline ' +
                                (showWholeDescription ? 'hidden' : 'block')
                            }
                            onClick={() => setShowWholeDescription(true)}
                        >
                            Pokaż więcej...{' '}
                        </p>
                    ) : null}
                </div>
            </div>

            <div className={'mt-5 md:flex md:flex-row  md:ml-8 md:mr-8 md:justify-end'}>
                <ButtonLink
                    class={'developer-button mt-5  md:mb-4 md:mt-0 col-span-full'}
                    value={'Pokaż profil'}
                    route={'/profil/' + developer.id}
                />
            </div>
        </div>
    );
};
