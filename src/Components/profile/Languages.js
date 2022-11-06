import {memo, useEffect, useState} from "react";
import {ListElement} from "./ListElement";
import {ProfileModule} from "./ProfileModule";

export const Languages = memo(({id, languages, setShowModals, personalData}) => {

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
                personalData={personalData}
                editRedirectUrl={"/profil/me/edytuj/jezyki"}
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