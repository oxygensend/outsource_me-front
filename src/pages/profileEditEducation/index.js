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
import formatTimePeriod from "../../helpers/formatTimePeriod";
import {JobPositions} from "../../Components/profile/JobPosition";
import {ListElement} from "../../Components/profile/ListElement";
import tokenService from "../../services/tokenService";
import {EditEducationModal} from "../../Components/Modals/EditEducationModal";

export const ProfileEditEducation = () => {

    const [education, setEducation] = useState([]);
    const location = useLocation();
    const [personalData, setPersonalData] = useState(location.state);
    const [showModals, setShowModals] = useState({jobPositions: false});
    const [selectedEducation, setSelectedEducation] = useState(null);
    const {id} = tokenService.getUser();


    useEffect(() => {
        return () => {
            getEducation();
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


    const getEducation = () => {
        profileService.getEducations(id)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    setEducation(response.data['hydra:member']);
                }
            }).catch(err => {

            console.log(err);
        });
    }

    const onClickDelete = (uni) => {
        authAxios.delete(API_URL + '/users/' + id + '/educations/' + uni.id).then((data) => {
            setEducation(deleteElementFromArray(education, uni))
        }).catch((e) => {
            console.log(e);
        });
    }

    const onClickEdit = (education) => {
        setSelectedEducation(education);
        setShowModals({education: true});
    }


    if (personalData) {

        return (
            <>
                <div className={"profile-container "}>
                    <PersonalInfo personalData={personalData}/>

                    <EditModule
                        title={"Wykształcenie"}
                        lastCol={'8'}
                        class={"mb-52"}
                    >
                        <div className={" gap-5  mt-5 flex-wrap mb-12"}>
                            {education ? education.map(element => {
                                return (
                                    <div className={" pt-2 flex flex-row justify-between"}
                                         style={{borderBottom: "1px solid rgb(15,82,139, 0.4)"}}
                                         key={element['@id']}>
                                        <ListElement
                                            name={element.university.name}
                                            timePeriod={element.fieldOfStudy + formatTimePeriod(element.startDate, element.endDate)
                                                + (element.title ? ' - ' + element.title : '')
                                            }
                                            key={element['@id']}
                                        >
                                            <p style={{fontSize: "14px"}}> {element.grade ? 'Ocena: ' + element.grade : null}</p>

                                        </ListElement>

                                        <div className={"flex flex-row gap-1"}>
                                            <img src={edit_icon}
                                                 alt={"edit"}
                                                 className={"mb-1 pt-8  pb-8 mt-1 cursor-pointer"}
                                                 onClick={() => onClickEdit(element)}
                                            />
                                            <img src={close_icon}
                                                 className={"mb-1 mt-1 cursor-pointer pb-8 pt-8"}
                                                 alt={"delete"}
                                                 width={20}
                                                 height={10}
                                                 onClick={() => onClickDelete(element)}
                                            />
                                        </div>
                                    </div>

                                )
                            }) : null}

                        </div>

                    </EditModule>

                </div>

                {showModals.education ?
                    <EditEducationModal
                        setShowModals={setShowModals}
                        education={education}
                        selectedEducation={selectedEducation}
                    /> : null

                }
            </>


        );
    } else {
        return null;
    }
}