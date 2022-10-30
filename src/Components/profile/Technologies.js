import {ProfileModule} from "./ProfileModule";
import {Technology} from "../Button/Technology";
import {memo, useEffect, useState} from "react";
import {AddTechnologyModal} from "../ProfileEditModal/AddTechnologyModal";
import {getData, scrollToTop} from "../../services/utils";

export const Technologies = memo(({personalData, setShowModals}) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [technologiesList, setTechnologiesList] = useState([]);
    const [reload, setReload] = useState([]);

    // useEffect(() => {
    //     setReload(false);
    // }, [reload])
    //
    //
    // useEffect(() => {
    //     return () => {
    //         if (showAddModal) {
    //             getData('/api/technologies').then(technologies => {
    //                 setTechnologiesList(technologies['hydra:member']);
    //             });
    //         }
    //     };
    // }, [showAddModal]);


    const onClickEdit = () => {
        window.location.href = '/profil/' + personalData.id + '/edytuj/technologie';
    }

    const onClickAdd = () => {
        setShowModals((prevState) => ({...prevState, ['technologies']: true}));

    }


    return (
        <ProfileModule
            title={"Technologie"}
            lastCol={'8'}
            class={"mb-52"}
            onClickEdit={() => onClickEdit()}
            onClickAdd={() => onClickAdd()}
        >

            <div className={"flex flex-row gap-5  mt-5 flex-wrap mb-12"}>
                {personalData.technologies ? personalData.technologies.map(technology => {
                    return (
                        <Technology name={technology.name} key={technology['@id']}/>);
                }) : null}

            </div>

            {showAddModal ?
                <AddTechnologyModal
                    technologiesList={technologiesList}
                    setReload={setReload}
                    setShowModal={setShowAddModal}
                /> : null}
        </ProfileModule>
    );
});