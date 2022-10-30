import {memo, useEffect, useState} from "react";
import profileService from "../../services/profileService";
import {ListElement} from "./ListElement";
import {ProfileModule} from "./ProfileModule";
import formatTimePeriod from "../../helpers/formatTimePeriod";

export const Education = memo(({id, setShowModals}) => {

    const [education, setEducation] = useState();


    useEffect(() => {
        return () => {
            getEducations();
        };
    }, []);

    const getEducations = () => {
        profileService.getEducations(id)
            .then(response => {
                if (response.status === 200) {
                    setEducation(response.data['hydra:member']);
                }
            }).catch(err => {

            console.log(err);
        });
    }
    const onClickAdd = () => {
        setShowModals((prevState) => ({...prevState, ['education']: true}));
    }

    if (education) {
        return (
            <ProfileModule
                title={"Wykształcenie"}
                breakLine={true}
                onClickAdd={onClickAdd}
            >
                {education.map((element) => {
                    return <ListElement
                        name={element.university.name}
                        timePeriod={element.fieldOfStudy + formatTimePeriod(element.startDate, element.endDate)
                            + (element.title ? ' - ' + element.title : '')
                        }
                        metaData={element.description}
                        key={element['@id']}
                    >
                        <p style={{fontSize: "14px"}}> {element.grade ? 'Ocena: ' + element.grade : null}</p>

                    </ListElement>
                })}
            </ProfileModule>
        )
    } else {
        return null;
    }
});