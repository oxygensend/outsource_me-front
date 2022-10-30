import {ProfileModule} from "./ProfileModule";
import {Technology} from "../Button/Technology";

export const Technologies = ({personalData}) => {

    const onClickEdit = () => {
        window.location.href = '/profil/' + personalData.id + '/edytuj/technologie';
    }

    const onClickAdd = () => {
        console.log(personalData)
        window.location.href = '/profil/' + personalData.id + '/dodaj/technologie';
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


        </ProfileModule>
    );
}