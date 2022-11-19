import {API_URL, SERVER_URL} from "../../config";
import {EditModule} from "../../Components/ProfileEdit/EditModule";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import profileService from "../../services/profileService";
import close_icon_red from '../../assets/icons/close_icon_red.png'
import authAxios from "../../services/authAxios";
import {PersonalInfo} from "../../Components/ProfileEdit/PersonalInfo";
import close_icon from "../../assets/icons/trashcan.png";
import tokenService from "../../services/tokenService";

export const ProfileEditTechnologies = () => {

    const location = useLocation();
    const [personalData, setPersonalData] = useState(location.state);
    const {id} = tokenService.getUser();
    const [technologies, setTechnologies] = useState(location.state?.technologies);


    useEffect(() => {
        return () => {
            console.log(personalData);
            if(!personalData){
               console.log('x')
                getPersonalData();
            }
        };
    }, []);


    const getPersonalData = () => {
        profileService.getPersonalData(id)
            .then(response => {
                if (response.status === 200) {
                    setPersonalData(response.data)
                    setTechnologies(response.data.technologies);
                }
            }).catch(err => {

            console.log(err);
        });
    }

    const onClickDelete = (technology) => {
        authAxios.delete(API_URL + '/users/' + id + '/technologies/' + technology.id).then((data) => {
            let newTechnologies = [...technologies];
            let index = newTechnologies.indexOf(technology)
            newTechnologies.splice(index, 1);
            setTechnologies(newTechnologies)
            window.flash("Technologia została usunieta", 'error')

        }).catch((e) => {
            console.log(e);
        });
    }

    if (personalData) {

        return (
            <div className={"profile-container full-height "}>
                <PersonalInfo personalData={personalData}/>

                <EditModule
                    title={"Technologie"}
                    lastCol={'8'}
                    class={"mb-52"}
                >
                    <div className={" gap-5  mt-5 flex-wrap mb-12"}>
                        {technologies ? technologies.map(technology => {
                            return (
                                <div className={" pt-2 flex flex-row justify-between"}
                                     style={{borderBottom: "1px solid rgb(15,82,139, 0.4)"}}
                                     key={technology['@id']}>
                                    <p className={"text-xl"}>{technology.name}</p>
                                    <img src={close_icon}
                                         className={"mb-1 mt-1 cursor-pointer"}
                                         alt={"delete"}
                                         width={20}
                                         onClick={() => onClickDelete(technology)}
                                    />
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