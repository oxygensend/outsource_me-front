import {JobOfferCard} from "../../Components/JobOfferCard/JobOfferCard";
import filter_icon from "../../assets/icons/filter-24.png"
import './index.css'
import {FiltersModal} from "../../Components/FiltersModal/FiltersModal";
import {useEffect, useState} from "react";
import {DeveloperCard} from "../../Components/DeveloperCard/DeveloperCard";

export const JobOffers = (props) => {

    const [filtersModal, setFiltersModal] = useState(true);


    return (
        <div className={"md:grid md:grid-cols-12  mt-20 md:mt-24"}>

            <div className={"mobile-filters-panel " + (!filtersModal ? 'mobile-hide' : null)}>
                <div className={"flex flex-row gap-2 cursor-pointer"} onClick={() => setFiltersModal(false)}>
                    <img src={filter_icon} alt={"filter_icon"}/>
                    <p className={"font-medium text-xl"}>Filtry</p>
                </div>
                <div className={"gap-10"}>
                    <p style={{color: "#7C8DB0"}}>2323 zleceń</p>
                </div>
            </div>


            <FiltersModal
                hide={filtersModal}
                onClick={setFiltersModal}
                class={"md:hidden"}
            />

            <FiltersModal
                hide={false}
                onClick={setFiltersModal}
                class={"mobile-hide2"}
            />

            {/*+ (!filtersModal ? 'hidden' : null)*/}
            <div className={'md:col-start-5 md:col-end-13 xl:col-start-5 xl:col-end-11 md:mr-12 xl:mr-0  md:flex' + (!filtersModal ? 'hidden' : null) }>
                <DeveloperCard/>
                <JobOfferCard/>
                <JobOfferCard/>
                <JobOfferCard/>
            </div>
        </div>
    );
}
