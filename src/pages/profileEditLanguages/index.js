import {API_URL, SERVER_URL} from "../../config";
import {EditModule} from "../../Components/ProfileEdit/EditModule";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import profileService from "../../services/profileService";
import close_icon from '../../assets/icons/trashcan.png'
import authAxios from "../../services/authAxios";
import {PersonalInfo} from "../../Components/ProfileEdit/PersonalInfo";
import edit_icon from "../../assets/icons/edit-icon.png";
import {deleteElementFromArray} from "../../services/utils";

export const ProfileEditLanguages = () => {

    const [languages, setLanguages] = useState([]);
    const location = useLocation();
    const [personalData, setPersonalData] = useState(location.state);
    const {id} = useParams();

    console.log(id);

    useEffect(() => {
        return () => {
            getLanguages();
            if (!personalData) {
                getPersonalData();
            }
        };
    }, []);

    const getPersonalData = () => {
        profileService.getPersonalData(id)
            .then(response => {
                if (response.status === 200) {
                    setPersonalData(response.data)
                }
            }).catch(err => {

            console.log(err);
        });
    }


    const getLanguages = () => {
        profileService.getLanguages('1')
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    setLanguages(response.data['hydra:member']);
                }
            }).catch(err => {

            console.log(err);
        });
    }

    const onClickDelete = (language) => {
        authAxios.delete(API_URL + '/users/' + '1' + '/languages/' + language.id).then((data) => {
            setLanguages(deleteElementFromArray(languages, language))
        }).catch((e) => {
            console.log(e);
        });
    }

    if (personalData) {

        return (
            <div className={"profile-container "}>
                <PersonalInfo personalData={personalData}/>

                <EditModule
                    title={"Języki"}
                    lastCol={'8'}
                    class={"mb-52"}
                >
                    <div className={" gap-5  mt-5 flex-wrap mb-12"}>
                        {languages ? languages.map(language => {
                            return (
                                <div className={" pt-2 flex flex-row justify-between"}
                                     style={{borderBottom: "1px solid rgb(15,82,139, 0.4)"}}
                                     key={language['@id']}>
                                    <p className={"text-xl"}>{language.name}</p>
                                    <div className={"flex flex-row gap-1"}>
                                        <img src={edit_icon} alt={"edit"} className={"mb-1 mt-1 cursor-pointer"}/>
                                        <img src={close_icon}
                                             className={"mb-1 mt-1 cursor-pointer"}
                                             alt={"delete"}
                                             width={20}
                                             onClick={() => onClickDelete(language)}
                                        />
                                    </div>
                                </div>

                            )
                        }) : null}

                    </div>

                </EditModule>

            </div>


        );
    } else {
        return null;
    }
}