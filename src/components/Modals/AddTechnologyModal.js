import { ModalWrapper } from './ModalWrapper';
import { memo, useState } from 'react';
import authAxios from '../../services/authAxios';
import { Button } from '../Button/Button';
import tokenService from '../../services/tokenService';
import { TechnologySearch } from '../Search/TechnologySearch';

export const AddTechnologyModal = memo(({ setShowModals }) => {
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [errors, setErrors] = useState(false);
    const  id  = tokenService.getUserId();

    const onSubmitHandler = async () => {
        setErrors(null);

        await authAxios
                .post('/users/' + id + '/technologies/addAll', { technologies: selectedTechnologies })
                .then((response) => {
                    if(response.status === 204){
                        window.location.href = '/profil/me';
                        window.flash('Technologie zostały dodane', 'success');
                    }
                })
                .catch((e) => {
                    if (e.response.status === 400) {
                        setErrors(true);
                    }
                });
    }

    return (
        <ModalWrapper
            title={'Dodaj technologie'}
            onSubmitHandler={onSubmitHandler}
            setShowModals={setShowModals}
            prop={'technologies'}
            errors={errors}
            type={'edit'}
        >
            <TechnologySearch
                selectedTechnologies={selectedTechnologies}
                setSelectedTechnologies={setSelectedTechnologies}
            />

            <Button className={'edit-button'} value={'Dodaj'} onClick={() => onSubmitHandler()} />
        </ModalWrapper>
    );
});
