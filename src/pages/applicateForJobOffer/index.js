import { API_URL, SERVER_URL } from '../../config';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import profileService from '../../services/profileService';
import { ApplicationForm } from '../../components/Forms/ApplicationForm';

export const ApplicateForJobOffer = () => {
    const location = useLocation();
    const [jobOffer, setJobOffer] = useState(location.state);
    const { slug } = useParams();

    const workTypeInfoMappings = {
        remote: 'Oferta całkowicie zdalna',
        office: 'Oferta z praca w biurze',
        hybrid: 'Możliwość pracy zdalnej i z biura',
        negotiations: 'Miejsce pracy do ustalenia',
    };

    useEffect(() => {
        return () => {
            if (!jobOffer) {
                getJobOffer();
            }
        };
    }, []);

    const getJobOffer = () => {
        profileService
            .getPersonalData(slug)
            .then((response) => {
                if (response.status === 200) {
                    setJobOffer(response.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (jobOffer) {
        return (
            <div className={'profile-container mb-10'}>
                <div className={'grid grid-cols-12 md:flex md:flex-row md:justify-between md:ml-8 md:mr-8'}>
                    <div className={'flex flex-row  gap-3 col-start-2 md:col-start-1 col-span-7 mt-10  '}>
                        <Link
                            to={'/profil/' + jobOffer.user.id}
                            children={
                                <img
                                    src={SERVER_URL + '/' + jobOffer.user.thumbnailPath}
                                    width={54}
                                    height={54}
                                    style={{ minHeight: '54px', minWidth: '54px' }}
                                    className={'rounded-2xl border-2  '}
                                    alt={'avatar'}
                                />
                            }
                        />

                        <div className={'relative bottom-0 pt-1'}>
                            <p className={'fullname-font2 '}>{jobOffer.user.fullName}</p>
                            <p className={'company-font2 mt-1'}>Zleceniodawca</p>
                        </div>
                    </div>

                    <div className={'mobile-hide2 application-font col-start-2 md:mt-11 col-span-6'}>
                        <p>{jobOffer.numberOfApplications + ' aplikacje'}</p>
                    </div>
                </div>

                <div className={'text-center mt-12'}>
                    <p className={'joboffer-title-font'}>{jobOffer.name}</p>
                    <p className={'joboffer-company-font mt-2'}>{jobOffer?.comapnyName ?? 'Oferta prywatna'}</p>

                    <p className={'joboffer-workType-font mt-4'}>{workTypeInfoMappings[jobOffer.workType[0].name]}</p>
                </div>

                <hr className={'col-span-full mt-5'} style={{ backgroundColor: '#0F528B', opacity: '0.8' }} />

                <p className={' mt-4 pl-12 sm:pl-24 sm:pr-24 pr-12 pt-10 pb-2'}>
                    Aplikujesz na <b>{jobOffer.name}</b>. Możesz dodać wiadomość dla zleceniodawcy i załączniki.
                    Zleceniodawca dodatkowo dostanie twój profil, dlatego sprawdź czy wszystkie potrzebne informacje są
                    tam zawarte.
                </p>
                <ApplicationForm jobOffer={jobOffer} />
            </div>
        );
    } else {
        return null;
    }
};
