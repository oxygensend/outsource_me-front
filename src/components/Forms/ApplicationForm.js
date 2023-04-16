import { Textarea } from '../Input/Textarea';
import { SubmitButton } from '../Button/SubmitButton';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dropbox } from '../Input/Dropbox';
import authAxios from '../../services/authAxios';
import { API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

export const ApplicationForm = ({ jobOffer }) => {
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        data.jobOffer = jobOffer['@id'];
        data.attachments = attachments;

        console.log(data);
        authAxios
            .post(API_URL + '/applications', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((data) => {
                console.log(data);
                window.flash('Aplikacja została przesłana', 'success');
                setTimeout(() => {
                    navigate(-1);
                }, 2000);

                // info modal
            })
            .catch((e) => {
                window.flash('Aplikowałeś już na to stanowisko', 'error');

                if (e.response.status === 422) {
                    setErrors(e.response.data.violations);
                }
            });
    };
    // ref

    // handle drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setAttachments((prevState) => [...prevState, e.dataTransfer.files[0]]);
        }
    };

    // triggers when file is selected with click
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setAttachments((prevState) => [...prevState, e.target.files[0]]);
        }
    };

    const findErrors = (property) => {
        return errors ? errors.find((el) => el.propertyPath === property) : null;
    };

    return (
        <form
            className={'flex flex-col'}
            onSubmit={handleSubmit(onSubmit)}
            onDragEnter={handleDrag}
            encType={'multipart/form-data'}
        >
            <Textarea
                name={'description'}
                placeholder={
                    'Dodaj dodatkowe informacje lub wiadomość do zleceniodawcy, np. dlaczego jesteś zainteresowany tym zleceniem'
                }
                className={'application-description'}
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
                files={attachments}
                setFiles={setAttachments}
            />

            <SubmitButton class={'edit-button mb-8 '} value={'Aplikuj'} />
        </form>
    );
};
