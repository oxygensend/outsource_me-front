import {InputProfile} from "../Input/InputProfile";
import {Textarea} from "../Input/Textarea";
import {SubmitButton} from "../Button/SubmitButton";
import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";
import {FileUploader} from "react-drag-drop-files";
import {Dropbox} from "../Input/Dropbox";

export const ApplicationForm = () => {

    const {register, handleSubmit} = useForm();
    const [errors, setErrors] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const onSubmit = async data => {

        // authAxios.patch(API_URL + '/users/' + personalData.id, data, {
        //     headers: {
        //         "Content-Type": "application/merge-patch+json"
        //     }
        // }).then(data => {
        //     window.location.href = '/profil/me';
        // })
        //     .catch((e) => {
        //
        //         if (e.response.status === 422) {
        //             setErrors(e.response.data.violations);
        //         }
        //
        //     })
    }
    // ref

    // handle drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            console.log(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // handleFiles(e.target.files);
        }
    };

// triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    const findErrors = (property) => {
        return errors ? errors.find(el => el.propertyPath === property) : null;
    }

    return (
        <form className={"flex flex-col"} onSubmit={handleSubmit(onSubmit)} onDragEnter={handleDrag}>


            <Textarea
                name={"description"}
                placeholder={"Dodaj dodatkowe informacje, np. dlaczego jesteś zainteresowany tym zleceniem"}
                className={"application-description"}
                register={register}
                required={false}
                error={findErrors('description')}
            />


            <Dropbox
                inputRef={inputRef}
                handleDrop={handleDrop}
                handleDrag={handleDrag}
                handleChange={handleChange}
                dragActive={dragActive}
            />

            <SubmitButton
                class={"edit-button mb-8 "}
                value={"Aplikuj"}
            />

        </form>
    );
}