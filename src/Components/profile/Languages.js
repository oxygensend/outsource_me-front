import {useEffect, useState} from "react";
import profileService from "../../services/profileService";
import {ListElement} from "./ListElement";
import {ProfileModule} from "./ProfileModule";

export const Languages = ({id}) => {
    const [languages, setLanguages] = useState();

    useEffect(() => {
        return () => {
            getLanguages();
        };
    }, []);

    const getLanguages = () => {
        profileService.getLanguages(id)
            .then(response => {
                if (response.status === 200) {
                    setLanguages(response.data['hydra:member']);
                }
            }).catch(err => {

            console.log(err);
        });
    }

    const onClickEdit = () => {
        window.location.href = '/profil/' + id + '/edytuj/jezyk';
    }

    const onClickAdd = () => {
        window.location.href = '/profil/' + id + '/dodaj/jezyk';
    }

    if (languages) {

        return (
            <ProfileModule
                title={"Języki"}
                breakLine={true}
                onClickAdd={onClickAdd}
                onClickEdit={onClickEdit}
            >
                {languages.map((element) => {
                    return (<ListElement
                        name={element.name}
                        metaData={element.description}
                        key={element['@id']}
                    />)
                })}
                <ListElement name={"Test"} metaData={"Zaawansowany"}/>


            </ProfileModule>
        );
    } else {
        return null;
    }
}