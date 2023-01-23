import {InputProfile} from "../Input/InputProfile";
import {Textarea} from "../Input/Textarea";
import {SubmitButton} from "../Button/SubmitButton";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Select} from "../Input/Select";
import {Checkbox} from "../Input/Checkbox";
import {TechnologySearch} from "../Search/TechnologySearch";
import {AddressSearch} from "../Search/AddressSearch";
import RichText from "../Input/RichText";
import {EditorState} from "draft-js";
import {stateToHTML} from "draft-js-export-html";
import htmlToDraft from 'html-to-draftjs';
import ContentState from "draft-js/lib/ContentState";
import {Search} from "../Search/Search";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";

export const JobOfferForm = ({
                                 jobOffer,
                                 employmentOptions,
                                 workTypeOptions,
                                 afterSubmit,
                                 buttonName,
                                 request
                             }) => {
    const setEditorState = () => {

        // TODO SOMETHING IS WRONG WITH ADDRESS SEARCH - TO CHECK
        if (jobOffer) {
            const blocksFromHtml = htmlToDraft(jobOffer.description);
            const {contentBlocks, entityMap} = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            return EditorState.createWithContent(contentState);
        } else {
            return EditorState.createEmpty();
        }
    }
    const editorState = setEditorState();
    const {register, handleSubmit, reset, control} = useForm({defaultValues: {description: editorState}});
    const [errors, setErrors] = useState(null);
    const experienceOptions = ['Senior', 'Junior', 'Mid', 'Expert', 'Stażysta'];
    const currencyOptions = ['PLN', 'EUR', 'USD'];
    const paymentsOptions = ['Brutto', 'Netto'];
    const [addAddress, setAddAddress] = useState(false);
    const [addSalaryRange, setAddSalaryRange] = useState(false);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [address, setAddress] = useState();

    const postalCodeFormApi = jobOffer?.address?.postCodes.split(',')[0];
    const [postalCode, setPostalCode] = useState(postalCodeFormApi);
    const [foundAddress, setFoundAddress] = useState(jobOffer?.address ? [jobOffer?.address] : []);
    const [postalCodeError, setPostalCodeError] = useState();


    useEffect(() => {
        return () => {
            if (jobOffer) {

                reset({
                    name: jobOffer.name,
                    formOfEmployment: jobOffer.formOfEmployment['@id'],
                    workType: jobOffer.workType['@id'],
                    validTo: jobOffer.validTo ? jobOffer.validTo.split('T')[0] : '',
                    experience: jobOffer.experience,
                    salaryRange: jobOffer.salaryRange,
                    address: jobOffer.address,
                })

                setAddSalaryRange(jobOffer.salaryRange);
                setAddAddress(jobOffer.address);
                setSelectedTechnologies(jobOffer.technologies.map(el => el['@id']));
                setAddress(jobOffer.address);
            }
        };
    }, [jobOffer]);


    const onSubmit = async data => {

        setErrors(null);

        if (data.validTo === '') {
            data.validTo = null;
        }

        if (data.formOfEmployment === '') {
            data.formOfEmployment = employmentOptions[0]['@id'];
        }

        if (data.workType === '') {
            data.workType = workTypeOptions[0]['@id'];
        }
        data.workType = [data.workType];
        data.technologies = selectedTechnologies;

        if (addSalaryRange) {
            data.salaryRange.downRange = Number(data.salaryRange.downRange)

            if (data.salaryRange.upRange !== '') {
                data.salaryRange.upRange = Number(data.salaryRange.upRange)
            } else {
                data.salaryRange.upRange = null;
            }
        } else {
             data.salaryRange = null;
        }

        if (!addAddress) {
            data.address = null;
        }

        console.log(foundAddress)
        if(!foundAddress ){
            data.address = foundAddress[0]['@id'];
        }

        console.log(foundAddress);

        data.description = stateToHTML(data.description.getCurrentContent());
        request(data).then(response => {
            afterSubmit(response)
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
    const onChangeHandler = async (event) => {

        const search = event.target.value;

        setPostalCode(search);

        if (search === '') {
            setFoundAddress([]);
            return;
        }

        authAxios.get(API_URL + '/addresses?search=' + search).then((response) => {
            setPostalCodeError(null);
            setFoundAddress(response.data['hydra:member'])
        }).catch((e) => {
            setFoundAddress([]);
            setPostalCodeError("Podany kod pocztowy jest niepoprawny");
        });


    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <p className={"mb-1 text-xl"}>Główne informacje</p>

            <InputProfile
                name={"name"}
                placeholder={"Np. Młodszy programista C++"}
                type={"text"}
                label={"Nazwa oferty *"}
                className={"input-field-second"}
                register={register}
                required={true}
                error={findErrors('name')}
            />

            <Select
                name={"formOfEmployment"}
                label={"Forma zatrudnienia *"}
                className={"jobPosition-select"}
                register={register}
                options={employmentOptions}
                property={"name"}
            />

            <Select
                name={"workType"}
                label={"Typ pracy *"}
                className={"jobPosition-select"}
                register={register}
                options={workTypeOptions}
                property={"name"}
            />

            <Select
                name={"experience"}
                label={"Wymagania *"}
                className={"jobPosition-select"}
                register={register}
                options={experienceOptions}
            />
            <div className={"mt-2"}>
                <label className={"input-label"}>Dodaj opis</label>
                <RichText name={"description"} control={control} placeholder={"Dodaj opis"}/>
            </div>
            <div>
                <p className={"mb-1 mt-2 text-xl"}>Technologie</p>
                <TechnologySearch
                    selectedTechnologies={selectedTechnologies}
                    setSelectedTechnologies={setSelectedTechnologies}
                />
            </div>

            <p className={"mb-1 mt-2 text-xl"}>Widełki</p>
            <Checkbox
                name={"salary"}
                label={"Dodaj widełki do swojej oferty"}
                class={"mb-4"}
                checked={addSalaryRange}
                onChange={() => setAddSalaryRange(!addSalaryRange)}
            />
            {addSalaryRange ?
                <div>
                    <p className={"input-label"}>Podaj kwote - drugie pole może pozostać puste</p>
                    <div className={"flex flex-row gap-2"}>

                        <InputProfile
                            name={"salaryRange.downRange"}
                            type={"number"}
                            label={""}
                            step={"0.01"}
                            className={"input-field-second"}
                            register={register}
                            required={false}
                        />

                        <InputProfile
                            name={"salaryRange.upRange"}
                            type={"number"}
                            step={"0.01"}
                            label={""}
                            className={"input-field-second"}
                            register={register}
                            required={false}
                            error={findErrors('salaryRange.upRange')}
                        />
                    </div>
                    {findErrors('salaryRange') ?
                        <span className={"font-medium tracking-wide ml-1 text-red-500 text-xs relative bottom-1 "}>
                            {findErrors('salaryRange').message}
                        </span>
                        : null}
                    <Select
                        name={"salaryRange.currency"}
                        label={"Waluta *"}
                        className={"jobPosition-select"}
                        register={register}
                        options={currencyOptions}
                    />
                    <Select
                        name={"salaryRange.type"}
                        label={"Typ wynagrodzenia *"}
                        className={"jobPosition-select"}
                        register={register}
                        options={paymentsOptions}
                    />
                </div>
                : null}

            <div className={"mt-5"}>
                <p className={"mb-1 text-xl"}>Lokalizacja</p>
                <Checkbox
                    name={"localization"}
                    label={"Dodaj lokalizacje do oferty"}
                    checked={addAddress}
                    class={"mb-4"}
                    onChange={() => setAddAddress(!addAddress)}
                />

                {addAddress ?
                    (<div>
                        <label className={"input-label"}>Kod pocztowy</label>

                        <Search
                            search={postalCode}
                            onChangeHandler={onChangeHandler}
                            placeholder={"Podaj kod pocztowy"}
                        />
                        <span
                            className={"font-medium tracking-wide ml-1 text-red-500 text-xs relative bottom-1 "}>
                {postalCodeError ?? postalCodeError}
                    </span>
                        {foundAddress.length > 0 ?
                            <Select
                                name={"address"}
                                label={"Miejscowość"}
                                register={register}
                                options={foundAddress}
                                property={"city"}
                            />
                            : null}

                    </div>)
                    : null
                }
            </div>


            <p className={"mb-1 mt-4 text-xl"}>Data wygaśniecia</p>
            <InputProfile
                name={"validTo"}
                type={"date"}
                label={"Pozostawnie tego pola pustego spowoduje, że oferta będzie ważna do czasu wyłączenia"}
                className={"input-field-second"}
                register={register}
                required={false}
                error={findErrors('')}
            />


            <SubmitButton
                class={"edit-button"}
                value={buttonName ?? 'Dodaj'}

            />
        </form>
    );
}