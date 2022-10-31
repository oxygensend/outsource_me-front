import {InputProfile} from "../Input/InputProfile";
import {Textarea} from "../Input/Textarea";
import {SubmitButton} from "../Button/SubmitButton";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";
import {Select} from "../Input/Select";

export const AddJobPositionForm = ({company, options}) => {

    const {register, handleSubmit, reset} = useForm();
    const [errors, setErrors] = useState(null);

    const onSubmit = async data => {

        console.log(data, company);
        if (data.validTo === '') {
            data.validTo = undefined;
        }
        if(data.formOfEmployment === ''){
            data.formOfEmployment = options[0]['@id'];
        }

        data.company = {name: company};

        console.log(data);
        authAxios.post(API_URL + '/job_positions', data).then(data => {
            window.location.href = '/profil/me';
        })
            .catch((e) => {

                console.log(e);
                if (e.response.status === 400) {
                    setErrors([{propertyPath: 'validFrom', message: 'Nie poprawny format daty.'}])
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
                name={"name"}
                placeholder={"Np. Młodszy programista C++"}
                type={"text"}
                label={"Stanowisko *"}
                className={"input-field-second"}
                register={register}
                required={true}
                error={findErrors('name')}
            />

            <Select
                name={"formOfEmployment"}
                label={"Forma zatrudnienia"}
                className={"jobPosition-select"}
                register={register}
                options={options}
                property={"name"}
            />

            <InputProfile
                name={"validFrom"}
                type={"date"}
                label={"Data rozpoczęcia *"}
                className={"input-field-second"}
                register={register}
                required={false}
                error={findErrors('validFrom')}
            />

            <InputProfile
                name={"validTo"}
                type={"date"}
                label={"Data zakończenia"}
                className={"input-field-second"}
                register={register}
                required={false}
                error={findErrors('validTo')}
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