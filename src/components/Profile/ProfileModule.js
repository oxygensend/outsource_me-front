import edit_icon from "../../assets/icons/edit-icon.png";
import plus from "../../assets/icons/plus.png";
import '../../pages/profile/index.css'
import {Link, useParams} from "react-router-dom";
import tokenService from "../../services/tokenService";
import {useState} from "react";

export const ProfileModule = ({
                                  lastCol,
                                  title,
                                  breakLine,
                                  onClickEdit,
                                  onClickAdd,
                                  children,
                                  personalData,
                                  editRedirectUrl,
                              }) => {

    return (


        <div className={"col-span-full mt-5 grid grid-cols-10 "}>

            <div className={"col-start-2 col-end-10 md:col-end-" + (lastCol ?? '10')}>
                <p className={"font-module pb-2"}>{title}</p>
                {children}

            </div>
            {tokenService.checkIfMe(personalData.id) ?
                <div className={"col-end-11  row-span-0 cursor-pointer"}>
                    <img src={plus} alt={"add"} onClick={onClickAdd}/>
                    <Link to={editRedirectUrl} state={personalData}
                          children={<img src={edit_icon} alt={"edit"} className={"mt-2"}/>}/>

                </div>
                : null}
            {
                breakLine ?
                    <hr className={"col-span-full mt-10 "} style={{backgroundColor: "#0F528B", opacity: "0.8"}}/>
                    : null
            }
        </div>
    );
}