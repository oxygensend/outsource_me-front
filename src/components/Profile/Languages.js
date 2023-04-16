import { memo, useEffect, useState } from 'react';
import { ListElement } from './ListElement';
import { ProfileModule } from './ProfileModule';
import profileService from '../../services/profileService';
import { getId } from '../../services/utils';
import { useParams } from 'react-router-dom';

export const Languages = memo(({ id, setShowModals, personalData }) => {
    const [languages, setLanguages] = useState();

    useEffect(() => {
        return () => {
            getLanguages();
        };
    }, []);

    const getLanguages = () => {
        profileService
            .getLanguages(id)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setLanguages(response.data['hydra:member']);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onClickEdit = () => {
        window.location.href = '/profil/' + id + '/edytuj/jezyk';
    };

    const onClickAdd = () => {
        setShowModals((prevState) => ({ ...prevState, ['languages']: true }));
    };

    if (languages) {
        return (
            <ProfileModule
                title={'Języki'}
                breakLine={true}
                onClickAdd={onClickAdd}
                onClickEdit={onClickEdit}
                personalData={personalData}
                editRedirectUrl={'/profil/me/edytuj/jezyki'}
            >
                {languages.map((element) => {
                    return <ListElement name={element.name} metaData={element.description} key={element['@id']} />;
                })}
            </ProfileModule>
        );
    } else {
        return null;
    }
});
