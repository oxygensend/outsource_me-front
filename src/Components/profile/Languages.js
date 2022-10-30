import {memo, useEffect, useState} from "react";
import profileService from "../../services/profileService";
import {ListElement} from "./ListElement";
import {ProfileModule} from "./ProfileModule";
import {AddLanguagesModal} from "../ProfileEditModal/AddLanguagesModal";
import {scrollToTop} from "../../services/utils";

export const Languages = memo(({id, languages, setShowModals}) => {

    const onClickEdit = () => {
        window.location.href = '/profil/' + id + '/edytuj/jezyk';
    }

    const onClickAdd = () => {
        setShowModals((prevState) => ({...prevState, ['languages']: true}));

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

            </ProfileModule>
        );
    } else {
        return null;
    }
});