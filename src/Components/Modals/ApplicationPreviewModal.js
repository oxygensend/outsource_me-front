import {ModalWrapper} from "./ModalWrapper";
import {EditUserPersonalInfoForm} from "../Forms/EditUserPersonalInfoForm";
import React, {useEffect, useState} from "react";
import parse from "html-react-parser";
import {getData} from "../../services/utils";

export const ApplicationPreviewModal = ({application, setShowModals}) => {

    const [selectedApplication, setSelectedApplication] = useState(application);
    useEffect(() => {
        return () => {
            getData(application['@id']).then(data => setSelectedApplication(data))
        };
    }, []);

   return (
       <ModalWrapper
           title={parse(`Aplikacja na stanowisko <b>` + selectedApplication.jobOffer.name + `</b>`)}
           titleCenter={true}
           setShowModals={setShowModals}
           prop={"previewApplication"}
           type={'edit'}
       >

           {selectedApplication.description}

       </ModalWrapper>
   )
}