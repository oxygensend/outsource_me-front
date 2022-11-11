import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {SubmitButton} from "../Button/SubmitButton";
import RichText from "../Input/RichText";
import {EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

export const MessageForm = ({userIri, application}) => {

    const {register, handleSubmit, control} = useForm({defaultValues: {DraftJS: EditorState.createEmpty()}});
    const [errors, setErrors] = useState(null);

    const onSubmit = async data => {

        console.log(stateToHTML(data.DraftJS.getCurrentContent()));
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

    const findErrors = (property) => {
        return errors ? errors.find(el => el.propertyPath === property) : null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <label className={"input-label"}>Wiadomość zostanie dostarczona przez skrzynke pocztową. Tam też spodziewaj
                się odpowiedzi</label>
            <RichText control={control} placeholder={"Napisz wiadomość"}/>

            <SubmitButton
                class={"edit-button"}
                value={"Wyślij"}
            />
        </form>
    );
}