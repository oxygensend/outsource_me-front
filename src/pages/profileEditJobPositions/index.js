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

export const ProfileEditJobPositions = () => {

    const [jobPositions, setJobPositions] = useState([]);
    const location = useLocation();
    const [personalData, setPersonalData] = useState(location.state);
    const {id} = useParams();

    console.log(id);

    useEffect(() => {
        return () => {
            getJobPositions();
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


    const getJobPositions = () => {
        profileService.getJobPositions('1')
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    setJobPositions(response.data['hydra:member']);
                }
            }).catch(err => {

            console.log(err);
        });
    }

    const onClickDelete = (jobPosition) => {
        authAxios.delete(API_URL + '/users/' + '1' + '/job_positions/' + jobPosition.id).then((data) => {
            setJobPositions(deleteElementFromArray(jobPositions, jobPosition))
        }).catch((e) => {
            console.log(e);
        });
    }

    if (personalData) {

        return (
            <div className={"profile-container "}>
                <PersonalInfo personalData={personalData}/>

                <EditModule
                    title={"Miejsca Pracy   "}
                    lastCol={'8'}
                    class={"mb-52"}
                >
                    <div className={" gap-5  mt-5 flex-wrap mb-12"}>
                        {jobPositions ? jobPositions.map(jobPosition => {
                            return (
                                <div className={" pt-2 flex flex-row justify-between"}
                                     style={{borderBottom: "1px solid rgb(15,82,139, 0.4)"}}
                                     key={jobPosition['@id']}>
                                    <ListElement
                                        name={jobPosition.company.name}
                                        timePeriod={formatTimePeriod(jobPosition.validFrom, jobPosition.validTo)}
                                        key={jobPosition['@id']}
                                        disableVector={true} >
                                        <p style={{fontSize: "14px"}}>
                                            {jobPosition.name + (jobPosition.formOfEmployment.name ? ', ' + jobPosition.formOfEmployment.name : null)}
                                        </p>
                                    </ListElement>

                                    <div className={"flex flex-row gap-1"}>
                                        <img src={edit_icon} alt={"edit"}
                                             className={"mb-1 pt-8  pb-8 mt-1 cursor-pointer"}/>
                                        <img src={close_icon}
                                             className={"mb-1 mt-1 cursor-pointer pb-8 pt-8"}
                                             alt={"delete"}
                                             width={20}
                                             height={10}
                                             onClick={() => onClickDelete(jobPosition)}
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