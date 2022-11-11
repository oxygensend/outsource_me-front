import calendar from "../../assets/icons/calendar.png";
import moment from "moment";
import React from "react";
import authAxios from "../../services/authAxios";
import fileDownload from "js-file-download";
import {onClickShowModal} from "../../services/utils";
import {Button} from "../Button/Button";

export const ApplicationInfoBox = ({application, setShowModals}) => {


    const onClickDownloadAttachment = (attachment) => {
        authAxios(attachment['@id'], {
            responseType: 'arraybuffer'
        }).then(data => {
            fileDownload(data.data, attachment.originalName);
        })
    }


    console.log(application);
    return (
        <div className={"application-box mt-20 "}>

            <div className={"box-wrapper"}>
                <div>
                    <p className={"text-red-700 text-lg font-bold mt-4 cursor-default"}>Dołączone pliki</p>
                    {application.attachments ? application.attachments.map((file, i) => {
                            return (
                                <p className={"pl-2 cursor-pointer hover:underline"}
                                   onClick={() => onClickDownloadAttachment(file)}
                                   key={i}
                                >
                                    {file.originalName}
                                </p>
                            )
                        }) :
                        <p className={"text-sm italic font-gray pl-2 "}>{'Brak załączników'}</p>
                    }

                    {application.description ?
                        <p className={"text-blue-500 text-lg font-bold mt-4 hover:underline hover:text-blue-400 cursor-pointer"}
                           onClick={() => onClickShowModal('applicationMessageModal', setShowModals)}
                        >
                            Pokaż wiadomość od kandydata
                        </p>
                        :
                        <p className={"text-blue-500 text-lg font-bold mt-4"}
                        >
                            Brak wiadomości

                        </p>
                    }
                </div>
                {
                    <Button
                        className={"application-button2"}
                        value={"Skontaktuj się"}
                        onClick={() => onClickShowModal('messageModal', setShowModals)}
                    />
                }
            </div>
            <div className={"flex flex-row gap-2 mt-4"}>
                <img src={calendar} alt={"calendar"}/>

                <p className={"font-time italic cursor-default"}>
                    {"Aplikowano " + moment(application.createdAt).fromNow()}
                </p>
            </div>
        </div>
    );
}