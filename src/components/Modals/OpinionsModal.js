import {ModalWrapper} from "./ModalWrapper";
import React, {useState} from "react";
import {OpinionForm} from "../Forms/OpinionForm";
import tokenService from "../../services/tokenService";
import {ReactComponent as Star} from "../../assets/icons/star.svg";
import { SERVER_URL} from "../../config";
import close_icon from "../../assets/icons/trashcan.png";
import authAxios from "../../services/authAxios";
import {deleteElementFromArray} from "../../services/utils";

export const OpinionsModal = ({setShowModals, opinions, userIri, personalData, setOpinions}) => {

    const myIri = '/api/users/' + tokenService.getUser().id;
    const checkIfIPostedOpinion = opinions.filter(el => el.fromWho['@id'] === myIri);
    const [opinionCount, setOpinionCount] = useState(personalData.opinionCount);

    const afterSubmit = (data) => {
        window.flash('Opinia została wystawiona', 'success')
        let opinionsOld = [...opinions];
        opinionsOld.push(data.data);
        setOpinions(opinionsOld);
        setOpinionCount(opinionCount + 1);
    }

    const onClickDelete = (opinion) => {
        console.log(opinion);
        const id = opinion['@id'].split('/')[3];
        authAxios.delete(SERVER_URL + myIri + '/opinions/' + id).then((data) => {
            window.flash("Opinia została usunieta", 'error')
            const newOpinions = deleteElementFromArray(opinions, opinion);
            setOpinions(newOpinions);
            setOpinionCount(opinionCount - 1);
        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <ModalWrapper
            title={"Opinie (" + opinionCount + ")"}
            setShowModals={setShowModals}
            prop={"opinionsModal"}
            type={'edit'}
        >

            {opinions.map((opinion, i) => {
                return (
                    <div className={"job-offer  mb-4"}>
                        <div className={"flex  flex-row justify-between ml-8 mr-8"}>

                            <div className={"flex flex-row  gap-3 col-start-2 md:col-start-1 col-span-7 mt-2  "}>
                                <img src={SERVER_URL + '/' + opinion.fromWho.thumbnailPath}
                                     style={{height: '50px', width: '50px'}}
                                     className={"rounded-2xl border-2  "} alt={"avatar"}/>

                                <div>
                                    <p className={"fullname-font "}>{opinion.fromWho.fullName}</p>
                                </div>

                                <div className={"flex flex-row gap-1 w-2/5 md:w-4/5"}>
                                    {(new Array(5)).fill("none").map((el, i) => i < opinion.scale ? "yellow" : "none").map((color, i) => {
                                        return (
                                            <Star key={i} fill={color}/>
                                        );
                                    })}
                                </div>
                            </div>

                            {opinion.fromWho['@id'] === myIri ?
                                <img src={close_icon}
                                     className={" cursor-pointer bottom-1  mt-10 md:mt-2"}
                                     alt={"delete"}
                                     style={{maxHeight: '19px'}}
                                     width={20}
                                     onClick={() => onClickDelete(opinion)}
                                /> : null}

                        </div>

                        <div className={"ml-8 mt-4 flex flex-row gap-2 pb-2"}>
                            <p>Komentarz: </p>
                            <p className={"font-info "}>
                                {opinion.description}
                            </p>
                        </div>
                    </div>
                );
            })}

            {checkIfIPostedOpinion.length === 0 ?
                <div className={"relative top-34"}>
                    {tokenService.checkIfMe(personalData.id) ? null :
                        <OpinionForm userIri={personalData['@id']} setOpinions={setOpinions} opinions={opinions}
                                     afterSubmit={afterSubmit}/>
                    }
                </div> : null}
        </ModalWrapper>
    );

}