import close_icon from '../../assets/icons/close-icon.svg'
import './FiltersModal.css'
import {Checkbox} from "../Input/Checkbox";
import {CheckboxOption} from "./CheckboxOption";
import {ButtonLink} from "../Button/ButtonLink";
import {Technology} from "../Button/Technology";
import {useState} from "react";
import {FilterItem} from "./FilterItem";

export const FiltersModal = (props) => {

    return (
        <div className={"bg-color md:col-start-1 md:col-end-4 xl:col-start-2 xl:col-end-5 xl:mr-16 md:ml-6 " + (props.hide ? "hidden " : null) + ' ' + (props.class ?? null)}>
            <div className={"flex flex-row justify-between bg-white order-2 md:hidden"} style={{padding: "16px  24px "}}>
                <div>
                    <p className={"font-medium text-xl"}>Wyczyść filtry</p>
                </div>
                <div>
                    <img src={close_icon} onClick={() => props.onClick(true)}/>
                </div>
            </div>
            <div className={"filter-section filter-header"}>
                <p className={"font-medium text-xl"}>Czego szukasz</p>
                <div className={"mt-3"}>
                    <CheckboxOption
                        name={"Zlecenia"}
                    />
                    <CheckboxOption
                        name={"Programiści"}
                    />
                </div>
            </div>

            <div className={"filter-section filter-header"}>
                <p className={"font-medium text-xl"}>Sortowanie</p>
                <div className={"mt-3"}>
                    <CheckboxOption
                        name={"Najnowsze"}
                    />
                    <CheckboxOption
                        name={"Popularne"}
                    />
                    <CheckboxOption
                        name={"Dla Ciebie"}
                    />
                </div>
            </div>

            <div className={"filter-section filter-header"}>
                <p className={"font-medium text-xl"}>Lokalizacja</p>
                <div className={"mt-3"}>
                    <input  className={"search"} type="text" placeholder="Szukaj..." value=""/>
                </div>
            </div>

            <div className={"filter-section filter-header"}>
                <p className={"font-medium text-xl"}>Technologie</p>
                <div className={"mt-3"}>
                    <input  className={"search"} type="text" placeholder="Szukaj..." value=""/>
                    <div className={"flex flex-row gap-2  mt-5 flex-wrap mb-12"}>
                        <FilterItem name={"Zdalnie"}/>
                        <FilterItem name={"Zdalnie"}/>
                        <FilterItem name={"Zdalnie"}/>
                        <FilterItem name={"Zdalnie"}/>
                        <FilterItem name={"Zdalnie"}/>
                    </div>
                </div>
            </div>
            <div className={"filter-section filter-header"}>
                <p className={"font-medium text-xl"}>Rodzaj pracy</p>
                <div className={"mt-3"}>
                    <div className={"flex flex-row gap-2  mt-5 flex-wrap mb-12"}>
                        <FilterItem name={"Zdalnie"}/>
                        <FilterItem name={"Zdalnie"}/>
                        <FilterItem name={"Zdalnie"}/>
                        <FilterItem name={"Zdalnie"}/>
                        <FilterItem name={"Zdalnie"}/>
                        <FilterItem name={"Zdalnie"}/>
                    </div>
                </div>
            </div>
            <div className={"mb-4 md:hidden"}>
                <div className={"application-button mt-5  p-8"}> Filtruj</div>
            </div>
        </div>
    );
}