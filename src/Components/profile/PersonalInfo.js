import {SERVER_URL} from "../../config";
import accountType from "../../translations/accountType";
import github from "../../assets/icons/github.png";
import linkedin from "../../assets/icons/linkedin.png";
import mail from "../../assets/icons/mail.svg";
import edit_icon from "../../assets/icons/edit-icon.png";
import tokenService from "../../services/tokenService";

export const PersonalInfo = ({personalData, setShowModals}) => {

    const checkIfMe = tokenService.checkIfMe(personalData.id);

    const onClickEdit = () => {
        setShowModals((prevState) => ({...prevState, ['personalInfo']: true}));

    }
    return (
        <div className={"col-span-full grid grid-cols-10"}>
            <div className={"md:col-start-2 md:col-span-4 col-start-2 col-span-6 mt-10"}>

                <img src={SERVER_URL + '/' + personalData.imagePath} width={120} height={120}
                     className={"rounded-2xl border-2  "} alt={"avatar"}/>

                <p className={"profile-fullname mt-2"}>{personalData.fullName}</p>
                <p className={" gray-font"}>{accountType(personalData.accountType)}</p>
                {personalData.address ?
                    <p className={"only-for-small-media gray-font2 italic"}>{personalData.address.city}</p>
                    : null}


                <div className={"flex flex-row gap-3 mt-2 items-center"}>
                    {personalData.githubUrl ?
                        <img src={github}
                             alt={"github"}
                             className={"cursor-pointer"}
                             onClick={() => window.location.href = personalData.githubUrl}/>
                        : null}
                    {personalData.linkedinUrl ?
                        <img src={linkedin}
                             alt={"linkedin"}
                             className={"cursor-pointer"}
                             onClick={() => window.location.href = personalData.linkedinUrl}/>
                        : null}
                    {checkIfMe ? null :
                        <img className={"only-for-small-media cursor-pointer"}
                             src={mail}
                             alt={"mail"}
                             width={16}
                             height={16}
                        />
                    }
                </div>

            </div>
            <div className={" col-start-8 col-span-2 "}>
                <div className={"relative flex flex-col gap-4 cursor-pointer"} style={{top: '75%'}}>
                    <div>
                        <p className={"red-font"}>43 Opinie</p>
                    </div>
                    <div>
                        {personalData.address ?
                            <p className={"gray-font2 italic only-for-big-media "}>{personalData.address.city}</p>
                            : null}
                        {checkIfMe ? null :
                            <div className={"flex flex-row gap-2  only-for-big-media cursor-pointer"}>
                                <img src={mail} alt={"mail"} width={16} height={16}/>
                                <p className={"red-font "}>Skontaktuj się</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {checkIfMe ?
                <div className={"col-end-11 mt-10 row-span-0 cursor-pointer"}>
                    <img src={edit_icon} alt={"edit"} onClick={() => onClickEdit()}/>
                </div> : null
            }

            <hr className={"col-span-full mt-10 "} style={{backgroundColor: "#0F528B", opacity: "0.8"}}/>
        </div>
    );
}