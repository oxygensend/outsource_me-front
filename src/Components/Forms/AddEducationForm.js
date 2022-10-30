import {InputProfile} from "../Input/InputProfile";
import {Textarea} from "../Input/Textarea";
import {SubmitButton} from "../Button/SubmitButton";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";

export const AddEducationForm = ({university}) => {

    const {register, handleSubmit} = useForm();
    const [errors, setErrors] = useState(null);


    const onSubmit = async data => {

        data.grade = Number(data.grade);
        data.university = university['@id'];

        if (data.endDate === '') {
            data.endDate = null;
        }

        authAxios.post(API_URL + '/education', data).then(data => {
        })
            .catch((e) => {

                if (e.response.status === 400) {
                    setErrors([{propertyPath: 'startDate', message: 'Nie poprawny format daty.'}])
                }
                if (e.response.status === 422) {
                    setErrors(e.response.data.violations);
                }

            })
    }

    const findErrors = (property) => {
        return errors ? errors.find(el => el.propertyPath === property) : null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <InputProfile
                name={"fieldOfStudy"}
                placeholder={"Np. Informatyka"}
                type={"text"}
                label={"Kierunek studiów *"}
                className={"input-field-second"}
                register={register}
                required={false}
                error={findErrors('fieldOfStudy')}
            />


            <InputProfile
                name={"grade"}
                placeholder={"Np. 5.0"}
                type={"text"}
                label={"Ocena"}
                className={"input-field-second"}
                register={register}
                required={false}
                error={findErrors('grade')}/>


            <InputProfile
                name={"title"}
                placeholder={"Np. magister"}
                type={"text"}
                label={"Tytuł naukowy"}
                className={"input-field-second"}
                register={register}
                required={false}
                error={findErrors('title')}
            />

            <InputProfile
                name={"startDate"}
                type={"date"}
                label={"Data rozpoczęcia *"}
                className={"input-field-second"}
                register={register}
                required={false}
                error={findErrors('startDate')}
            />

            <InputProfile
                name={"endDate"}
                type={"date"}
                label={"Data zakończenia"}
                className={"input-field-second"}
                register={register}
                required={false}
                error={findErrors('endDate')}
            />


            <Textarea
                name={"description"}
                placeholder={"Dodaj opis"}
                label={"Opis"}
                className={"input-field-second"}
                register={register}
                required={false}
                error={findErrors('description')}
            />

            <SubmitButton
                class={"edit-button"}
                value={"Dodaj"}
            />
        </form>
    );
}