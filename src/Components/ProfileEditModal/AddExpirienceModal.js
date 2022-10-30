import {EditModal} from "./EditModal";
import {Search} from "../Search/Search";
import {searchArray} from "../../services/utils";
import React, {useState} from "react";
import close_icon from "../../assets/icons/close-icon.svg";
import {AddEducationForm} from "../Forms/AddEducationForm";

export const AddExpirienceModal = ({universitiesList}) => {

    const [search, setSearch] = useState('')
    const [results, setResults] = useState([]);
    const [selectedUni, setSelectedUni] = useState(null);

    const onChangeHandler = async (event) => {

        const search = event.target.value.toLowerCase();
        setSearch(search);

        if (search === '') {
            return setResults([]);
        }

        const results = searchArray(search, universitiesList, 'name')
        console.log(results);


        setResults(results.slice(1, 6));
    }

    const onClickClearButton = () => {
        setSelectedUni(null);
        setSearch("");

    }

    const onSearchedElementClick = (university) => {
        setSelectedUni(university);
        setResults([]);
    }

    console.log(selectedUni);
    return (
        <EditModal
            title={"Dodaj wykształcenie"}
            // onSubmitHandler={onSubmitHandler}
            // errors={errors}
        >
            <img
                src={close_icon}
                alt={"close icon"}
                className={"bg-red-400 rounded-2xl  flex relative top-2 right-1 cursor-pointer " + (!selectedUni ? 'hidden' : '')}
                width={15}
                height={15}
                style={{background: "#D82521"}}
                onClick={() => onClickClearButton()}
            />
            <Search
                search={selectedUni ? selectedUni.name : search}
                onChangeHandler={onChangeHandler}
                placeholder={"Wybierz uczelnie"}
            />

            <ul className={"search-results" + (results.length > 1 ? 'block' : 'hidden')}>
                {results.map((university, i) => {
                    return (
                        <li
                            key={i}
                            className={"border-b-2 border-gray-100 cursor-pointer hover:bg-gray-100 p-1"}
                            style={{opacity: "0.7"}}
                            onClick={() => onSearchedElementClick(university)}

                        >
                            {university.name}
                        </li>
                    );
                })}
            </ul>

            {selectedUni ?
                <AddEducationForm
                    university={selectedUni}

                />
                : null
            }

        </EditModal>
    );

}