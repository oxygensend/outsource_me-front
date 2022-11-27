import {ModalWrapper} from "./ModalWrapper";
import React, {useEffect, useRef, useState} from "react";
import ReactCrop from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css'
import {Button} from "../Button/Button";
import authAxios from "../../services/authAxios";
import {API_URL} from "../../config";
import {closeModal} from "../../services/utils";

export const UploadPhotoModal = ({setShowModals, personalData}) => {

    const [src, setSrc] = useState();
    const imgRef = useRef();
    const [crop, setCrop] = useState({
        unit: '%',
        width: 50,
        height: 50,
    });

    const selectImage = (file) => {
        setSrc(URL.createObjectURL(file));
    };

    const cropImage = () => {

        const canvas = document.createElement('canvas');
        const image = imgRef.current;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        return canvas;
    };

    const saveImage = () => {
        let canvas = cropImage()

        canvas.toBlob(blob => {
            const file = new File([blob], "image.jpeg");
            authAxios.post(API_URL + '/users/' + personalData.id + '/upload_photo', {
                    file: file
                }, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            ).then(response => {
                window.flash('Zdjecie zostało zmienione', 'success')
                closeModal('uploadPhotoModal', setShowModals);
                window.location.reload();
            }).catch(e => {
                console.log(e);
            })

        });
    }

    const onFileChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            selectImage(e.target.files[0]);
        }
    }
    return (
        <ModalWrapper
            title={"Zdjęcie profilowe"}
            prop={"uploadPhotoModal"}
            setShowModals={setShowModals}
            type={'edit'}
        >
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    onFileChange(e)
                }}
            />
            <br/>
            <br/>
            <div>
                {src && (
                    <div>
                        <ReactCrop
                            crop={crop}
                            aspect={1}
                            minWidth={120}
                            minHeight={120}
                            onChange={(c) => setCrop(c)}>
                            <img
                                src={src}
                                ref={imgRef}
                            />
                        </ReactCrop>
                        <Button
                            className={"edit-button mb-8 "}
                            value={"Zapisz"}
                            onClick={() => saveImage()}
                        />
                    </div>
                )}
            </div>
        </ModalWrapper>
    );

}