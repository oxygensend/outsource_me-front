import { SERVER_URL } from '../../config';
import accountType from '../../translations/accountType';
import github from '../../assets/icons/github.png';
import linkedin from '../../assets/icons/linkedin.png';
import arrow from '../../assets/icons/arrow-left.png';

export const PersonalInfo = ({ personalData }) => {
    return (
        <div className={'col-span-full grid grid-cols-10'}>
            <img
                src={arrow}
                alt={'back'}
                className={'mt-5 ml-5 cursor-pointer'}
                onClick={() => window.history.go(-1)}
            />
            <div className={'md:col-start-2 md:col-span-4 col-start-2 col-span-6 mt-10'}>
                <img
                    src={SERVER_URL + '/' + personalData.imagePath}
                    style={{ width: '120px', height: '120px' }}
                    className={'rounded-2xl border-2  '}
                    alt={'avatar'}
                />

                <p className={'profile-fullname mt-2'}>{personalData.fullName}</p>
                <p className={' gray-font'}>{accountType(personalData.accountType)}</p>
                {personalData.address ? <p className={'gray-font2 italic'}>{personalData.address.city}</p> : null}

                <div className={'flex flex-row gap-3 mt-2 items-center'}>
                    {personalData.githubUrl ? (
                        <img
                            src={github}
                            alt={'github'}
                            className={'cursor-pointer'}
                            onClick={() => (window.location.href = personalData.githubUrl)}
                        />
                    ) : null}
                    {personalData.linkedinUrl ? (
                        <img
                            src={linkedin}
                            alt={'linkedin'}
                            className={'cursor-pointer'}
                            onClick={() => (window.location.href = personalData.linkedinUrl)}
                        />
                    ) : null}
                </div>
            </div>

            <hr className={'col-span-full mt-10 '} style={{ backgroundColor: '#0F528B', opacity: '0.8' }} />
        </div>
    );
};
