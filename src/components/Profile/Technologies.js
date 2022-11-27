import {ProfileModule} from "./ProfileModule";
import {Technology} from "../Button/Technology";
import {memo, useEffect, useState} from "react";
import {getData, scrollToTop} from "../../services/utils";
import {useNavigate} from "react-router-dom";

export const Technologies = memo(({personalData, setShowModals}) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [technologiesList, setTechnologiesList] = useState([]);
    const [reload, setReload] = useState([]);
    const navigate = useNavigate();

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
        // navigate('/profil/1/edytuj/technologie', {state: {personalData: personalData}});
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
            personalData={personalData}
            editRedirectUrl={"/profil/me/edytuj/technologie"}
            onClickAdd={() => onClickAdd()}

        >

            <div className={"flex flex-row gap-5  mt-5 flex-wrap mb-12"}>
                {personalData.technologies ? personalData.technologies.map(technology => {
                    return (
                        <Technology name={technology.name} key={technology['@id']}/>);
                }) : null}

            </div>

        </ProfileModule>
    );
});