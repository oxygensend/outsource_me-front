import {InputProfile} from "../Input/InputProfile";
import {Textarea} from "../Input/Textarea";
import {SubmitButton} from "../Button/SubmitButton";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";

export const AddLanguageForm = () => {

    const {register, handleSubmit} = useForm();
    const [errors, setErrors] = useState(null);


    const onSubmit = async data => {


        authAxios.post(API_URL + '/languages', data).then(data => {
            window.location.href = '/profil/me';
        })
            .catch((e) => {

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
                name={"name"}
                placeholder={"Np. Angielski"}
                type={"text"}
                label={"Język *"}
                className={"input-field-second"}
                register={register}
                required={true}
                error={findErrors('name')}
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