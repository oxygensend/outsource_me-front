import React, {useEffect, useState} from "react";
import './index.css';
import {getData} from "../../services/utils";
import tokenService from "../../services/tokenService";
import moment from "moment/moment";
import 'moment/locale/pl'
import {ApplicationCard} from "../../Components/Application/ApplicationCard";

moment.locale('pl');

export const YourApplications = () => {
    const [activeApplications, setActiveApplications] = useState(null)
    const [deactiveApplications, setDeactiveApplications] = useState(null)
    const [showActiveApplications, setShowActiveApplications] = useState(false);
    const [showDeactivedApplications, setShowDeactivedApplications] = useState(false);

    const {id} = tokenService.getUser();

    useEffect(() => {
        return () => {
            getData('/api/users/' + id + '/applications?order[createdAt]=desc&order[status]=desc').then(data => {
                    let active = [];
                    let deactive = [];
                    data['hydra:member'].forEach((application, i) => {
                        if (application.status === 1)
                            active.push(
                                <ApplicationCard
                                    id={i}
                                    application={application}
                                    onClickDelete={() => onClickDelete(application)}
                                />
                            )
                        else {
                            deactive.push(
                                <ApplicationCard
                                    id={i}
                                    application={application}
                                    onClickDelete={() => onClickDelete(application)}
                                />
                            )
                        }
                    });
                    setDeactiveApplications(deactive);
                    setActiveApplications(active);
                }
            );
        };
    }, []);

    const onClickDelete = (application) => {
        console.log(activeApplications);
        // authAxios.delete(API_URL + '/applications/' + application.id).then((data) => {
        //     console.log(application);
        //     let newApplications = [...activeApplications];
        //     let index = newApplications.indexOf(application)
        //     newApplications.splice(index, 1);
        //     setActiveApplications(newApplications)
        // }).catch((e) => {
        //     console.log(e);
        // });
    }

    if (deactiveApplications || activeApplications) {
        return (
            <div className={"applications-wrapper pt-4"}>
                <div className={"text-center text-3xl "}>
                    <p>Twoje aplikacje </p>
                </div>

                <hr className={" mt-4 "} style={{backgroundColor: "#0F528B", opacity: "0.8"}}/>

                <div>
                    <p className={"font-module mt-5 margin-l "}>{"Aktywne aplikacje(" + activeApplications.length + ")"} </p>
                    <div className="flex flex-col mt-5 gap-3 items-center">

                        {showActiveApplications ? activeApplications : activeApplications.slice(0, 3)}

                    </div>
                    {activeApplications.length > 3 && !showActiveApplications ?
                        <p className={"red-font mt-2 margin-l cursor-pointer"}
                           onClick={() => setShowActiveApplications(true)}>
                            Pokaż wszystkie...
                        </p>
                        : null}
                </div>

                <div>
                    <p className={"font-module mt-5 margin-l "}>{"Wygaśnięte aplikacje(" + deactiveApplications.length + ")"} </p>
                    <div className="flex flex-col mt-5 gap-3 items-center">

                        {showDeactivedApplications ? deactiveApplications : deactiveApplications.slice(0, 3)}

                    </div>
                    {deactiveApplications.length > 3 && !showDeactivedApplications ?
                        <p className={"red-font mt-2 mb-2 margin-l cursor-pointer"}
                           onClick={() => setShowDeactivedApplications(true)}>
                            Pokaż wszystkie...
                        </p>
                        : null}
                </div>
            </div>


        );
    } else {
        return null;
    }
}