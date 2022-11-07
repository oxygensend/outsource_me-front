import {ModalWrapper} from "./ModalWrapper";
import {Button} from "../Button/Button";
import React from "react";

export const InfoModal = ({prop, setShowModals, content, onConfirmClick, confirmButtonValue, title}) => {

    return (
        <ModalWrapper
            title={title}
            setShowModals={setShowModals}
            prop={prop}
            type={"info"}
        >
            <p>{content}</p>

            <div className={"flex flex-row justify-between"}>

                <Button
                    className={"outsourceme_button outsource_takeOn"}
                    onClick={() => {
                        onConfirmClick()
                    }}
                    value={confirmButtonValue}
                />


            </div>
        </ModalWrapper>
    );

}