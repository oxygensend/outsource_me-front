import {AddModal} from "./AddModal";
import {Search} from "../Search/Search";
import {TechnologiesBox} from "../FiltersModal/TechnologiesBox";
import {memo, useEffect, useState} from "react";
import {getData, isInArray, patchData, postData, searchArray} from "../../services/utils";
import {useParams} from "react-router-dom";
import authAxios from "../../services/authAxios";
import {Button} from "../Button/Button";

export const AddTechnologyModal = memo(({ setShowModals}) => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState(null);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [errors, setErrors] = useState(false);
    const {id} = useParams();


    const [technologiesList, setTechnologiesList] = useState([]);
    const [reload, setReload] = useState([]);

    useEffect(() => {
        setReload(false);
    }, [reload])

    useEffect(() => {

        return () => {
                getData('/api/technologies').then(technologies => {
                    console.log(technologies);
                    setTechnologiesList(technologies['hydra:member']);
                });

        }
    }, []);


    console.log(technologiesList);
    const onClickTechnology = (technology) => {

        if (isInArray(technology['@id'], selectedTechnologies)) {
            const index = selectedTechnologies.indexOf(technology['@id']);
            selectedTechnologies.splice(index, 1);
        } else {
            selectedTechnologies.push(technology['@id']);
        }

        setReload(true);

    }

    const onChangeHandler = async (event) => {

        const search = event.target.value.toLowerCase();
        setSearch(search);

        if (search === '') {
            return setResults(null);
        }

        const results = searchArray(search, technologiesList, 'name')


        setResults(results.slice(1, 6));
    }


    const onSubmitHandler = async () => {

        let countSuccessfullResponses = 0;
        setErrors(null);

        for (const technology of selectedTechnologies) {

            await authAxios.post('/users/' + '1' + '/technologies', {iri: technology}).then((response) => {
                countSuccessfullResponses++;
            }).catch((e) => {
                if (e.response.status === 400) {
                    setErrors(true);
                }
            })
        }

        if (countSuccessfullResponses === selectedTechnologies.length) {
            window.location.href = '/profil/me';
        }

    }

    return (
        <AddModal
            title={"Dodaj technologie"}
            onSubmitHandler={onSubmitHandler}
            setShowModals={setShowModals}
            prop={"technology"}
            errors={errors}
        >
            <Search
                value={search}
                onChangeHandler={onChangeHandler}
            />

            <TechnologiesBox
                results={results}
                technologiesList={technologiesList}
                onClickTechnology={onClickTechnology}
                selectedTechnologies={selectedTechnologies}
                filterProperty={'@id'}

            />

            <Button
                className={"edit-button"}
                value={"Dodaj"}
                onClick={() => onSubmitHandler()}
            />

        </AddModal>
    );
});