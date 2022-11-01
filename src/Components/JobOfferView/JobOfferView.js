import {SERVER_URL} from "../../config";
import React from "react";
import avatar from '../../assets/images/avatar.png';
import {Technology} from "../Button/Technology";
import {Link} from "react-router-dom";

export const JobOfferView = ({jobOffer}) => {

    const workTypeInfoMappings = {
        remote: 'Oferta całkowicie zdalna',
        office: 'Oferta z praca w biurze',
        hybrid: 'Możliwość pracy zdalnej i z biura',
        negotiations: 'Miejsce pracy do ustalenia'
    }


    return (
        <div className={"profile-container"}>
            <div className={"grid grid-cols-12 md:flex md:flex-row md:justify-between md:ml-8 md:mr-8"}>

                <div className={"flex flex-row  gap-3 col-start-2 md:col-start-1 col-span-7 mt-10  "}>
                    <Link to={'/profil/' + jobOffer.user.id}
                          children={
                              <img
                                  src={SERVER_URL + '/' + jobOffer.user.imagePath}
                                  width={54} height={54}
                                  className={"rounded-2xl border-2  "}
                                  alt={"avatar"}
                              />
                          }
                    />

                    <div className={"relative bottom-0 pt-1"}>
                        <p className={"fullname-font2 "}>{jobOffer.user.fullName}</p>
                        <p className={"company-font2 mt-1"}>Zleceniodawca</p>
                    </div>
                </div>

                <div className={"mobile-hide2 application-font col-start-2 md:mt-11 col-span-6"}>
                    <p>{jobOffer.numberOfApplications + ' aplikacje'}</p>
                </div>

            </div>

            <div className={"text-center mt-12"}>
                <p className={"joboffer-title-font"}>{jobOffer.name}</p>
                <p className={"joboffer-company-font mt-2"}>{jobOffer?.comapnyName ?? "Oferta prywatna"}</p>

                <p className={"joboffer-workType-font mt-4"}>{workTypeInfoMappings[jobOffer.workType[0].name]}</p>
            </div>

            <hr className={"col-span-full mt-5"} style={{backgroundColor: "#0F528B", opacity: "0.8"}}/>

            <div className={"col-span-full mt-12 grid grid-cols-10 "}>

                <div className={"col-start-2 col-end-10 md:col-end-"}>
                    <p className={"font-module pb-2"}>{"Technologie"}</p>
                    <div className={"flex flex-row gap-5  mt-2 flex-wrap "}>
                        {jobOffer.technologies.map((technology, i) => {
                            return (
                                <Technology name={technology.name} key={i}/>
                            );
                        })}
                    </div>
                </div>
                <div className={"col-start-2  flex gap-2 col-end-10 mt-5"}>
                    <p className={"font-module"}>Wymagania: </p>
                    <p className={"font-submodule"}>{jobOffer.experience}</p>
                </div>

                <div className={"col-start-2 flex gap-2 col-end-10 mt-5"}>
                    <p className={"font-module"}>Wymiar pracy: </p>
                    <p className={"font-submodule"}>{jobOffer.formOfEmployment.name}</p>
                </div>

                <div className={"col-start-2 gap-2 col-end-10 mt-5 mb-10"}>
                    <p className={"font-module mb-2"}>Opis</p>
                    <p>
                        {jobOffer.description}
                    </p>
                </div>
            </div>


        </div>
    );
}