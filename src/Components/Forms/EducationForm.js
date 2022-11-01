import {InputProfile} from "../Input/InputProfile";
import {Textarea} from "../Input/Textarea";
import {SubmitButton} from "../Button/SubmitButton";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";
import {Select} from "../Input/Select";
import {getDataAuthentication, searchArray} from "../../services/utils";
import close_icon from "../../assets/icons/close-icon.svg";
import {Search} from "../Search/Search";
import {SearchInput} from "../Input/SearchInput";

export const EducationForm = ({options, education, request, afterSubmit, buttonName}) => {

    const {register, handleSubmit, reset} = useForm();
    const [errors, setErrors] = useState(null);
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([]);
    const [selectedUni, setSelectedUni] = useState(education?.university ?? null);
    const [universitiesList, setUniversitiesList] = useState([]);

    useEffect(() => {
        return () => {
            getDataAuthentication('/api/universities').then(universities => {
                setUniversitiesList(universities['hydra:member']);
            });
        };
    }, []);

    console.log(education);

    useEffect(() => {
        return () => {
            if (education) {
                reset({
                    fieldOfStudy: education.fieldOfStudy,
                    grade: education.grade,
                    title: education.title,
                    startDate: education.startDate.split('T')[0],
                    endDate: education.endDate ? education.endDate.split('T')[0] : '',
                    description: education.description
                })
            }
        };
    }, [education]);


    const onChangeHandler = async (event) => {

        const search = event.target.value.toLowerCase();
        setSearch(search);

        if (search === '') {
            return setResults([]);
        }

        const results = searchArray(search, universitiesList, 'name')


        setResults(results.slice(1, 6));
    }

    const onClickClearButton = () => {
        setSelectedUni(null);
        setSearch("");

    }

    const onSearchedElementClick = (uni) => {
        setSelectedUni(uni);
        setSearch(uni.name);
        setResults([]);
    }


    const onSubmit = async data => {

        data.grade = Number(data.grade);
        try {
            data.university = selectedUni['@id'];
        } catch (e) {
            setErrors([{propertyPath: 'search', message: 'Musisz wybrać jedeną z uczelni'}])
            return;
        }

        if (data.endDate === '') {
            data.endDate = null;
        }

        authAxios.post(API_URL + '/education', data).then(data => {
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
                label={"Wybierz uczelnie *"}
                search={selectedUni ? selectedUni.name : search}
                onChangeHandler={onChangeHandler}
                error={findErrors('search')}
                onSearchedElementClick={onSearchedElementClick}
                selected={selectedUni}
                onClickClearButton={onClickClearButton}
                results={results}
                placeholder={"Wybierz uczelnie *"}
            />


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