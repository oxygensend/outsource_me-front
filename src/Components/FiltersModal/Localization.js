import {FilterSection} from "./FilterSection";
import {useState} from "react";
import close_icon from '../../assets/icons/close-icon.svg';
import {searchArray} from "../../services/utils";

export const Localization = ({addressesList, onFilterClick, address}) => {

    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(address);

    // search logic
    const onChangeHandler = async (event) => {

        const search = event.target.value.toLowerCase();
        setSearch(search);

        if (search === '') {
            return setResults([]);
        }

        const results = searchArray(search, addressesList, 'city')
        setResults(results.slice(1, 6));
    }

    const onSearchedElementClick = (address) => {
        setSelectedAddress(address);
        setResults([]);
        onFilterClick('address', address.id)
    }

    const onClickClearButton = () => {
        setSelectedAddress(null);
        setSearch("");
        onFilterClick('address', null)

    }
    return (
        <FilterSection subTitle={"Lokalizacja"} className={"mb-5"}>
            <img
                src={close_icon}
                alt={"close icon"}
                className={"bg-red-400 rounded-2xl  flex relative top-2 right-1 cursor-pointer " + (!selectedAddress && !address ? 'hidden' : '')}
                width={15}
                height={15}
                style={{background: "#D82521"}}
                onClick={() => onClickClearButton()}
            />
            <input
                className={"search"}
                type="text"
                placeholder="Szukaj..."
                value={address ? address.city : selectedAddress ? selectedAddress.city : search}
                onChange={onChangeHandler}
            />

            <ul className={"search-results " + (results.length > 1 ? 'block' : 'hidden')}>
                {results.map((address, i) => {
                    return (
                        <li
                            key={i}
                            className={"border-b-2 border-gray-100 cursor-pointer hover:bg-gray-100 p-1"}
                            style={{opacity: "0.7"}}
                            onClick={() => onSearchedElementClick(address)}
                        >
                            {address.city}
                        </li>
                    );
                })}
            </ul>
        </FilterSection>
    );
}