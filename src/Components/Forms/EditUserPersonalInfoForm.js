import {useForm} from "react-hook-form";
import React, {useState} from "react";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";
import {SubmitButton} from "../Button/SubmitButton";
import {InputProfile} from "../Input/InputProfile";
import {Search} from "../Search/Search";
import {Select} from "../Input/Select";

export const EditUserPersonalInfoForm = ({personalData}) => {

    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: personalData.name,
            surname: personalData.surname,
            phoneNumber: personalData.phoneNumber,
            email: personalData.email,
            dateOfBirth: personalData.dateOfBirth.split('T')[0],
            githubUrl: personalData.githubUrl,
            linkedinUrl: personalData.linkedinUrl

        }
    });

    const postalCodeFormApi = personalData.address.postCodes.split(',')[0]
    const [postalCode, setPostalCode] = useState(postalCodeFormApi);
    const [foundAddress, setFoundAddress] = useState([personalData.address]);
    const [errors, setErrors] = useState(null);
    const [postalCodeError, setPostalCodeError] = useState();


    const onSubmit = async data => {

        if (data.githubUrl === undefined) {
            data.githubUrl = null;
        }
        if (data.linkedinUrl === undefined) {
            data.linkedinUrl = null;
        }

        authAxios.patch(API_URL + '/users/' + personalData.id, data, {
            headers: {
                "Content-Type": "application/merge-patch+json"
            }
        }).then(data => {
            window.location.href = '/profil/me';
            window.flash('Informacje zostały zaktualizowane', 'success')

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

    const onChangeHandler = async (event) => {

        const search = event.target.value;

        setPostalCode(search);

        if (search === '') {
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

            <div>
                <p className={"text-xl"}>Dane osobowe</p>
                <InputProfile
                    name={"name"}
                    type={"text"}
                    label={"Imię *"}
                    className={"input-field-second"}
                    register={register}
                    required={true}
                    error={findErrors('name')}
                />
                <InputProfile
                    name={"surname"}
                    type={"text"}
                    label={"Nazwisko *"}
                    className={"input-field-second"}
                    register={register}
                    required={true}
                    error={findErrors('surname')}
                />
                <InputProfile
                    name={"email"}
                    type={"email"}
                    label={"Email *"}
                    className={"input-field-second"}
                    register={register}
                    required={true}
                    error={findErrors('email')}
                />
                <InputProfile
                    name={"phoneNumber"}
                    type={"text"}
                    label={"Numer telefonu"}
                    className={"input-field-second"}
                    register={register}
                    required={false}
                    error={findErrors('phoneNumber')}
                />
                <InputProfile
                    name={"dateOfBirth"}
                    type={"date"}
                    label={"Data urodzenia"}
                    className={"input-field-second"}
                    register={register}
                    required={false}
                    error={findErrors('dateOfBirth')}
                />

            </div>

            <div className={"mt-5"}>
                <p className={"mb-2 text-xl"}>Lokalizacja</p>
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

            </div>

            <div className={"mt-5"}>
                <p className={"text-xl"}>Portale Społecznościowe</p>
                {personalData.accountType === 'Developer' ?
                    <InputProfile
                        name={"githubUrl"}
                        type={"text"}
                        label={"Github"}
                        placeholder={"https://github.com"}
                        className={"input-field-second"}
                        register={register}
                        required={false}
                        error={findErrors('githubUrl')}
                    /> : null}

                <InputProfile
                    name={"linkedinUrl"}
                    type={"text"}
                    label={"Linkedin"}
                    placeholder={"https://linkedin.com"}
                    className={"input-field-second"}
                    register={register}
                    required={false}
                    error={findErrors('linkedinUrl')}
                />
            </div>
            <SubmitButton
                class={"edit-button mb-4"}
                value={"Zmień"}
            />
        </form>
    );
}
