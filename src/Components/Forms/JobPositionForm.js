import {InputProfile} from "../Input/InputProfile";
import {Textarea} from "../Input/Textarea";
import {SubmitButton} from "../Button/SubmitButton";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";
import {Select} from "../Input/Select";
import {getData, searchArray} from "../../services/utils";
import close_icon from "../../assets/icons/close-icon.svg";
import {Search} from "../Search/Search";
import {SearchInput} from "../Input/SearchInput";

export const JobPositionForm = ({options, jobPosition, request, afterSubmit, buttonName}) => {

    const {register, handleSubmit, reset} = useForm();
    const [errors, setErrors] = useState(null);
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(jobPosition?.company ?? null);
    const [companiesList, setCompaniesList] = useState([]);

    useEffect(() => {
        return () => {
            Promise.all([
                getData('/api/companies').then(companies => {
                    setCompaniesList(companies['hydra:member']);
                }),


            ])
        };
    }, []);

    useEffect(() => {
        return () => {
            if (jobPosition) {
                reset({
                    name: jobPosition.name,
                    formOfEmployment: jobPosition.formOfEmployment['@id'],
                    startDate: jobPosition.startDate.split('T')[0],
                    endDate: jobPosition.endDate ? jobPosition.endDate.split('T')[0] : '',
                    description: jobPosition.description
                })
            }
        };
    }, [jobPosition]);


    const onChangeHandler = async (event) => {

        const search = event.target.value.toLowerCase();
        setSearch(search);

        if (search === '') {
            return setResults([]);
        }

        const results = searchArray(search, companiesList, 'name')


        setResults(results.slice(1, 6));
    }

    const onClickClearButton = () => {
        setSelectedCompany(null);
        setSearch("");

    }

    const onSearchedElementClick = (company) => {
        setSelectedCompany(company);
        setSearch(company.name);
        setResults([]);
    }


    const onSubmit = async data => {

        if (data.endDate === '') {
            data.endDate = undefined;
        }
        if (data.formOfEmployment === '') {
            data.formOfEmployment = options[0]['@id'];
        }

        data.company = {name: selectedCompany ? selectedCompany.name : search};
        if (data.company.name.trim() === '') {
            setErrors([{propertyPath: 'search', message: 'Musisz podać nazwe firmy'}])
            return;
        }

        authAxios.post(API_URL + '/job_positions', data).then(data => {
            afterSubmit(data);
        })
            .catch((e) => {

                console.log(e);
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

            <SearchInput
                label={"Podaj nazwe firmy *"}
                search={selectedCompany ? selectedCompany.name : search}
                onChangeHandler={onChangeHandler}
                error={findErrors('search')}
                onSearchedElementClick={onSearchedElementClick}
                selected={selectedCompany}
                onClickClearButton={onClickClearButton}
                results={results}
                placeholder={"Podaj nazwe firmy lub wybierz z dostępnych"}
            />

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
                error={findErrors('')}
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
                value={buttonName ?? 'Dodaj'}

            />
        </form>
    );
}