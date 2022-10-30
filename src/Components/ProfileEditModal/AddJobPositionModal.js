import {EditModal} from "./EditModal";
import {Search} from "../Search/Search";
import {searchArray} from "../../services/utils";
import React, {useState} from "react";
import close_icon from "../../assets/icons/close-icon.svg";
import {AddJobPositionForm} from "../Forms/AddJobPositionForm";

export const AddJobPositionModal = ({companiesList, formOfEmployments}) => {

    const [search, setSearch] = useState('')
    const [results, setResults] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const onChangeHandler = async (event) => {

        const search = event.target.value.toLowerCase();
        setSearch(search);

        if (search === '') {
            return setResults([]);
        }

        const results = searchArray(search, companiesList, 'name')


        setResults(results.slice(1, 6));
    }

    const onClickClearButton = () => {
        setSelectedCompany(null);
        setSearch("");

    }

    const onSearchedElementClick = (company) => {
        setSelectedCompany(company);
        setSearch(company.name);
        setResults([]);
    }

    return (
        <EditModal
            title={"Dodaj miejce pracy"}
            // onSubmitHandler={onSubmitHandler}
            // errors={errors}
        >
            <img
                src={close_icon}
                alt={"close icon"}
                className={"bg-red-400 rounded-2xl  flex relative top-2 right-1 cursor-pointer " + (!selectedCompany ? 'hidden' : '')}
                width={15}
                height={15}
                style={{background: "#D82521"}}
                onClick={() => onClickClearButton()}
            />
            <Search
                search={selectedCompany ? selectedCompany.name : search}
                onChangeHandler={onChangeHandler}
                placeholder={"Podaj nazwe firmy lub wybierz z dostępnych"}
            />

            <ul className={"search-results" + (results.length > 1 ? 'block' : 'hidden')}>
                {results.map((company, i) => {
                    return (
                        <li
                            key={i}
                            className={"border-b-2 border-gray-100 cursor-pointer hover:bg-gray-100 p-1"}
                            style={{opacity: "0.7"}}
                            onClick={() => onSearchedElementClick(company)}

                        >
                            {company.name}
                        </li>
                    );
                })}
            </ul>

            {/*{selectedCompany ?*/}
                <AddJobPositionForm
                    company={search}
                    options={formOfEmployments}

                />
                {/*: null*/}
            {/*}*/}

        </EditModal>
    );

}