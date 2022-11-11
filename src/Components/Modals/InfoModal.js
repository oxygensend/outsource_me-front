import {ModalWrapper} from "./ModalWrapper";
import React from "react";
import parse from "html-react-parser";
import mail from "../../assets/icons/mail.svg";
import phone from "../../assets/icons/device-mobile.png";
import linkedin from "../../assets/icons/linkedin.png";
import {onClickShowModal} from "../../services/utils";

export const InfoModal = ({prop, setShowModals, personalData, onConfirmClick, confirmButtonValue, title}) => {

    return (
        <ModalWrapper
            title={title}
            setShowModals={setShowModals}
            prop={prop}
            type={"info"}
        >
            <hr className={" mb-3 "} style={{backgroundColor: "#0F528B", opacity: "0.8"}}/>
            <div className={"flex flex-col gap-1"}>
                <div className={"flex flex-row gap-2"}>
                    <img className={"mt-0.5"}
                         src={mail}
                         alt={"mail"}
                         width={16}
                         height={16}
                    />
                    <p
                        className={"text-blue-500  hover:underline cursor-pointer"}
                        onClick={() => onClickShowModal('messageModal', setShowModals)}
                    >
                        {personalData.email} </p>
                </div>
                <div className={"flex flex-row gap-2 "}>
                    <img src={linkedin}
                         alt={"linkedin"}
                    />
                    <a href={personalData.linkedinUrl}
                       className={"text-blue-500  hover:underline cursor-pointer"}>Linkedin </a>
                </div>
                <div className={"flex flex-row gap-2"}>
                    <img className={"mt-1"}
                         src={phone}
                         alt={"phone"}
                         style={{maxHeight: "16px"}}
                    />
                    <p className={"text-blue-500"}>{personalData.phoneNumber} </p>
                </div>
            </div>

        </ModalWrapper>
    );

}