import close_icon from '../../assets/icons/close-icon.svg'
import './FiltersModal.css'
import {CheckboxOption} from "./CheckboxOption";
import {useState} from "react";
import {FilterItem} from "./FilterItem";
import {insertUrlParam} from "../../hooks/insertUrlParam";

export const FiltersModal = (props) => {

    const [activeJobOffer, setActiveJobOffer] = useState({developers: false, offers: true});
    const [activeSortFiler, setActiveSortFilter] = useState({newest: false, popular: false, forYou: true})

    const jobOfferTypeClick = ({developers, offers}) => {
        setActiveJobOffer({
            developers: !developers,
            offers: !offers
        });
    }
    const activeFilterChange = (newest, popular, forYou) => {
        setActiveSortFilter({
            newest: newest,
            popular: popular,
            forYou: forYou
        });
    }

    const jobOfferOnClick = () => {
        if (!activeJobOffer.offers) {
            jobOfferTypeClick(activeJobOffer);
            insertUrlParam('typ_oferty', 'zleceniodawca');
        }
    }

    const developersOnClick = () => {
        if (!activeJobOffer.developers) {
            jobOfferTypeClick(activeJobOffer);
            insertUrlParam('typ_oferty', 'programista');
        }
    }

    const newestFilterOnClick = () => {
        if (!activeSortFiler.newest) {
            activeFilterChange(true, false, false);
            insertUrlParam('sort', 'najnowsze');
        }

    }
    const popularFilterOnClick = () => {
        if (!activeSortFiler.popular) {
            insertUrlParam('sort', 'popularne');
            activeFilterChange(false, true, false);
        }
    }
    const forYouFilterOnClick = () => {
        if (!activeSortFiler.forYou) {
            insertUrlParam('sort', 'dla-ciebie')
            activeFilterChange(false, false, true);
        }
    }


    return (
        <div
            className={"bg-color md:col-start-1 md:col-end-4 xl:col-start-2 xl:col-end-5 xl:mr-16 md:ml-6 " + (props.hide ? "hidden " : null) + ' ' + (props.class ?? null)}>
            <div className={"flex flex-row justify-between bg-white order-2 md:hidden "}
                 style={{padding: "16px  24px "}}>
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
                        onClick={() => {
                            jobOfferOnClick()
                        }}
                        active={activeJobOffer.offers}
                    />
                    <CheckboxOption
                        name={"Programiści"}
                        onClick={() => {
                            developersOnClick()
                        }}
                        active={activeJobOffer.developers}
                    />
                </div>
            </div>

            <div className={"filter-section filter-header"}>
                <p className={"font-medium text-xl"}>Sortowanie</p>
                <div className={"mt-3"}>
                    <CheckboxOption
                        name={"Najnowsze"}
                        onClick={() => {
                            newestFilterOnClick()
                        }}
                        active={activeSortFiler.newest}
                    />
                    <CheckboxOption
                        name={"Popularne"}
                        onClick={() => {
                            popularFilterOnClick()
                        }}
                        active={activeSortFiler.popular}
                    />
                    <CheckboxOption
                        name={"Dla Ciebie"}
                        onClick={() => {
                            forYouFilterOnClick()
                        }}
                        active={activeSortFiler.forYou}
                    />
                </div>
            </div>

            <div className={"filter-section filter-header"}>
                <p className={"font-medium text-xl"}>Lokalizacja</p>
                <div className={"mt-3 mb-5"}>
                    <input className={"search"} type="text" placeholder="Szukaj..." value=""/>

                    <ul className={"search-results hidden"}>
                        <li className={"border-b-2 border-gray-100"} style={{opacity: "0.7"}}>Kraków, Woj.Małopolskie
                        </li>
                        <li className={"border-b-2 border-gray-100"} style={{opacity: "0.7"}}>Poznan,
                            Woj.Wielkopolskie
                        </li>
                        <li className={"border-b-2 border-gray-100"} style={{opacity: "0.7"}}>Warszawa,
                            Woj.Mazowieckie
                        </li>
                        <li style={{opacity: "0.7"}}>Lublin, Woj.Opolskie</li>
                    </ul>
                </div>
            </div>

            <div className={"filter-section filter-header"}>
                <p className={"font-medium text-xl"}>Technologie</p>
                <div className={"mt-3"}>
                    <input className={"search"} type="text" placeholder="Szukaj..." value=""/>
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