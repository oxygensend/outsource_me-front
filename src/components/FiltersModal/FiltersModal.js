import close_icon from '../../assets/icons/close-icon.svg'
import './FiltersModal.css'
import {FilterSection} from "./FilterSection";
import {Sorting} from "./Sorting";
import {WhatYouLookinFor} from "./WhatYouLookinFor";
import {Localization} from "./Localization";
import {Technologies} from "./Technologies";
import {WorkTypes} from "./WorkTypes";

export const FiltersModal = ({
                                 onClick,
                                 hide,
                                 className,
                                 onFilterClick,
                                 filtersSettings,
                                 addressesList,
                                 technologiesList,
                                 workTypesList
                             }) => {

    const sortOptions = [
        {
            name: 'newest',
            placeholder: 'Najnowsze'
        },
        {
            name: 'popular',
            placeholder: 'Popularne'
        },
        {
            name: 'for-you',
            placeholder: 'Dla ciebie'
        },
    ]

    const {address, developers, order, technologies, principles, workTypes} = filtersSettings;


    return (
        <div
            className={"bg-color md:col-start-1 md:col-end-4 xl:col-start-2 xl:col-end-5 xl:mr-16 md:ml-6 " + (hide ? "hidden " : null) + ' ' + (className ?? null)}>
            <div className={"flex flex-row justify-between bg-white order-2 md:hidden "}
                 style={{padding: "16px  24px "}}>
                <div>
                    <p className={"font-medium text-xl"}>Wyczyść filtry</p>
                </div>
                <div>
                    <img src={close_icon} onClick={() => onClick(true)}/>
                </div>
            </div>
            <FilterSection subTitle={"Czego szukasz"}>
                <WhatYouLookinFor
                    developers={developers}
                    principles={principles}
                    onFilterClick={onFilterClick}
                />

            </FilterSection>
            <FilterSection subTitle={"Sortowanie"}>
                <Sorting
                    options={sortOptions}
                    selectedOption={order}
                    onFilterClick={onFilterClick}
                />
            </FilterSection>


            <Localization
                addressesList={addressesList}
                onFilterClick={onFilterClick}
                address={addressesList.find(element => element.id == address)}
            />

            <Technologies
                technologiesList={technologiesList}
                onFilterClick={onFilterClick}
                technologies={technologies}
            />

            {
                filtersSettings.principles ?
                    <WorkTypes
                        workTypesList={workTypesList}
                        onFilterClick={onFilterClick}
                        workTypes={workTypes}
                    /> : null
            }

            <div className={"mb-4 md:hidden cursor-pointer"}>
                <div
                    className={"application-button mt-5  p-8"}
                    onClick={() => onClick(true)}
                > Filtruj
                </div>
            </div>
        </div>
    );
}