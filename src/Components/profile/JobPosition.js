import {useEffect, useState} from "react";
import profileService from "../../services/profileService";
import formatTimePeriod from "../../helpers/formatTimePeriod";
import {ListElement} from "./ListElement";
import {ProfileModule} from "./ProfileModule";

export const JobPositions = ({id}) => {
    const [jobPositions, setJobPositions] = useState();
    const [showResults, setShowResults] = useState(false);
    const results = [];


    useEffect(() => {
        return () => {
            getJobPositions();
        };
    }, []);

    const getJobPositions = () => {
        profileService.getJobPositions(id)
            .then(response => {
                if (response.status === 200) {
                    setJobPositions(response.data['hydra:member']);
                }
            }).catch(err => {

            console.log(err);
        });

    }

    if (jobPositions) {

        jobPositions.forEach(element => {
            results.push(
                <ListElement
                    name={element.company.name}
                    timePeriod={formatTimePeriod(element.validFrom, element.validTo)}
                    metaData={element.description}
                    key={element['@id']}

                >
                    <p style={{fontSize: "14px"}}>
                        {element.name + (element.formOfEmployment.name ? ', ' + element.formOfEmployment.name : null)}
                    </p>
                </ListElement>
            );

        })


        return (
            <ProfileModule title={"Doświadczenie"} breakLine={true}>

                {showResults ? results : results.slice(0, 3)}
                {results.length > 3 && !showResults ?
                    <p className={"red-font mt-5 cursor-pointer"}
                       onClick={() => setShowResults(true)}>
                        Pokaż więcej...
                    </p>
                    : null}

            </ProfileModule>
        );
    } else {
        return null;
    }
}