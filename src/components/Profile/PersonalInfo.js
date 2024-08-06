import { API_URL, SERVER_URL } from '../../config';
import accountType from '../../translations/accountType';
import github from '../../assets/icons/github.png';
import linkedin from '../../assets/icons/linkedin.png';
import mail from '../../assets/icons/mail.svg';
import edit_icon from '../../assets/icons/edit-icon.png';
import { ReactComponent as Star } from '../../assets/icons/star.svg';
import keen_to_work from '../../assets/images/keen_to_work.svg';
import recruiting from '../../assets/images/recruiting.svg';
import tokenService from '../../services/tokenService';
import { Button } from '../Button/Button';
import { onClickShowModal, opinionsStringPluralForm } from '../../services/utils';
import { check } from 'prettier';

export const PersonalInfo = ({ personalData, setShowModals }) => {
    const checkIfMe = tokenService.checkIfMe(personalData.id);

    const stars = new Array(5).fill('none').map((el, i) => (i < personalData.opinionsRate ? 'yellow' : 'none'));

    const onClickEdit = () => {
        setShowModals((prevState) => ({ ...prevState, ['personalInfo']: true }));
    };

    const onClickOpenAdvertisement = () => {
        setShowModals((prevState) => ({
            ...prevState,
            ['openAdvertisement']: true,
        }));
    };

    const onClickOpenContactModal = () => {
        setShowModals((prevState) => ({ ...prevState, ['contactModal']: true }));
    };

    const onClickCloseAdvertisement = () => {
        setShowModals((prevState) => ({
            ...prevState,
            ['closeAdvertisement']: true,
        }));
    };

    const onClickOpenUploadPhotoModal = () => {
        if (tokenService.checkIfMe(personalData.id)) {
            onClickShowModal('uploadPhotoModal', setShowModals);
        }
    };

    const checkIfUserIsDeveloper = () => {
        return personalData.accountType === 'Developer';
    };
    const checkIfUserHaveAnyJobOffer = () => {
        const activeJobOffers = personalData.jobOffers ? personalData.jobOffers.filter((el) => !el.archived) : [];
        return personalData.accountType === 'Principal' && activeJobOffers.length > 0;
    };


    return (
        <div className={'col-span-full grid grid-cols-10'}>
            {checkIfMe ? (
                <div className={'col-end-11  mt-10 row-span-0 cursor-pointer'}>
                    <img src={edit_icon} alt={'edit'} onClick={() => onClickEdit()} />
                </div>
            ) : null}
            <div className={'md:col-start-2  md:col-span-4 col-start-2 col-span-6 ' + (checkIfMe ? '' : 'mt-14')}>
                {checkIfUserHaveAnyJobOffer() ? <img src={recruiting} className={'right-2 relative '} /> : null}
                {checkIfUserIsDeveloper() && personalData.lookingForJob ? (
                    <img src={keen_to_work} className={'right-6 relative '} />
                ) : null}

                <img
                    src={SERVER_URL + '/' + personalData.imagePath}
                    style={{ width: '120px', height: '120px' }}
                    className={
                        'rounded-2xl border-2  ' + (tokenService.checkIfMe(personalData.id) ? 'cursor-pointer' : null)
                    }
                    alt={'avatar'}
                    onClick={() => onClickOpenUploadPhotoModal()}
                />

                <p className={'profile-fullname mt-2'}>{personalData.fullName}</p>
                <p className={' gray-font text-red-300'}>
                    {accountType(personalData.accountType) +
                        (personalData.accountType === 'Developer' && personalData.experience
                            ? '(' + personalData.experience + ')'
                            : '')}
                </p>
                {personalData.address ? (
                    <p className={'only-for-small-media gray-font2 italic'}>{personalData.address.city}</p>
                ) : null}

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
                    {checkIfMe ? null : (
                        <img
                            className={'only-for-small-media cursor-pointer'}
                            src={mail}
                            alt={'mail'}
                            width={16}
                            height={16}
                            onClick={() => onClickOpenContactModal()}
                        />
                    )}
                </div>

                {checkIfMe && checkIfUserIsDeveloper() ? (
                    personalData.lookingForJob ? (
                        <Button
                            className={'outsourceme_button outsource_takeOff  mt-4'}
                            onClick={() => onClickCloseAdvertisement()}
                            value={'Zamknij ogłoszenie'}
                        />
                    ) : (
                        <Button
                            className={'outsourceme_button outsource_takeOn mt-4'}
                            onClick={() => onClickOpenAdvertisement()}
                            value={'Ogłoś się'}
                        />
                    )
                ) : null}
            </div>
            <div className={' col-start-8 col-span-3 ' + (checkIfMe ? '' : 'mt-14')}>
                <div className={'relative flex flex-col gap-32 cursor-pointer mr-5  mt-10'}>
                    <div onClick={() => onClickShowModal('opinionsModal', setShowModals)}>
                        <div className={'flex flex-row gap-1'}>
                            {stars.map((color, i) => {
                                return <Star key={i} fill={color} />;
                            })}
                        </div>
                        <p className={'red-font mt-3'}>
                            {personalData.opinionCount + opinionsStringPluralForm(personalData.opinionCount)}
                        </p>
                    </div>
                    <div>
                        {personalData.address ? (
                            <p className={'gray-font2 italic only-for-big-media '}>{personalData.address.city}</p>
                        ) : null}
                        {checkIfMe ? null : (
                            <div className={'flex flex-row gap-2 mt-1 only-for-big-media cursor-pointer'}>
                                <img src={mail} alt={'mail'} width={16} height={16} />
                                <p onClick={() => onClickOpenContactModal()} className={'red-font hover:underline '}>
                                    Skontaktuj się
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <hr className={'col-span-full mt-10 '} style={{ backgroundColor: '#0F528B', opacity: '0.8' }} />
        </div>
    );
};
