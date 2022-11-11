import {ModalWrapper} from "./ModalWrapper";
import {memo, useState} from "react";
import authAxios from "../../services/authAxios";
import {Button} from "../Button/Button";
import tokenService from "../../services/tokenService";
import {TechnologySearch} from "../Search/TechnologySearch";

export const AddTechnologyModal = memo(({setShowModals}) => {
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [errors, setErrors] = useState(false);
    const {id} = tokenService.getUser();


    const onSubmitHandler = async () => {

        let countSuccessfullResponses = 0;
        setErrors(null);

        for (const technology of selectedTechnologies) {

            await authAxios.post('api/users/' + id + '/technologies', {iri: technology}).then((response) => {
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
        <ModalWrapper
            title={"Dodaj technologie"}
            onSubmitHandler={onSubmitHandler}
            setShowModals={setShowModals}
            prop={"technologies"}
            errors={errors}
            type={'edit'}
        >

            <TechnologySearch
                selectedTechnologies={selectedTechnologies}
                setSelectedTechnologies={setSelectedTechnologies}
            />

            <Button
                className={"edit-button"}
                value={"Dodaj"}
                onClick={() => onSubmitHandler()}
            />

        </ModalWrapper>
    );
});