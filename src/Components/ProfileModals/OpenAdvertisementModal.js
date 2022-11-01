import {ModalWrapper} from "./ModalWrapper";
import React from "react";
import {Button} from "../Button/Button";

export const OpenAdvertisementModal = ({setShowModals}) => {

    const closeModal = () => {
        setShowModals((prevState) => ({...prevState, ['openAdvertisement']: false }));
    }

    return (
        <ModalWrapper
            title={"Pokaż, że jesteś otwarty na nowe zlecenia!"}
            setShowModals={setShowModals}
            prop={"openAdvertisement"}
        >
            <p>Przed dodaniem zgłoszenia upewnij się, ze w zakładkach na twoim profilu zawarte są wszystkie potrzebne
                informacje. Jeżeli chcesz, coś zmienić zrób to teraz, więcej informacji o Tobie pomaga rekruterom w
                wyborze.</p>

            <div className={"flex flex-row justify-between"}>

                <Button
                    className={"outsourceme_button outsource_takeOn"}
                    value={"Ogłoś się"}
                />

                <Button
                    className={"outsourceme_button outsource_takeOff2"}
                    onClick={() => closeModal() }
                    value={"Cofnij"}
                />
            </div>
        </ModalWrapper>
    );

}