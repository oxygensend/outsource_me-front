import edit_icon from '../../assets/icons/edit-icon.png';
import tokenService from '../../services/tokenService';

export const Description = ({ personalData, setShowModals }) => {
    const onClickEdit = () => {
        setShowModals((prevState) => ({ ...prevState, ['description']: true }));
    };

    return (
        <div className={'col-span-full grid grid-cols-10 mt-5'}>
            <div className={'col-start-2 col-end-10'}>
                <p className={'font-module pb-2'}>O mnie</p>
                <p className={'italic pl-1 mt-5'}>{personalData.description ?? 'Brak opisu.'}</p>
            </div>
            {tokenService.checkIfMe(personalData.id) ? (
                <div className={'col-end-11 mt-30'}>
                    <img src={edit_icon} alt={'edit'} className={'cursor-pointer'} onClick={() => onClickEdit()} />
                </div>
            ) : null}
            <hr className={'col-span-full mt-10'} style={{ backgroundColor: '#0F528B', opacity: '0.8' }} />
        </div>
    );
};
