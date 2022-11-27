import React, {useState} from "react";

export const Searchbar = ({className, search}) => {

    const [searchText, setSearchText] = useState(search);

    const onChangeHandler = (event) => {
        const search = event.target.value.toLowerCase();
        setSearchText(search);
    }

    const handleKeyDown = (event) => {

        if (event.keyCode !== 13) return;

        window.location.href = '/wyszukaj?value=' + searchText;
    }

    return (
        <div className={className ?? "nav-search"}>
            <input
                className={"search"}
                type="text"
                placeholder="Szukaj..."
                value={searchText}
                onChange={onChangeHandler}
                onKeyDown={handleKeyDown}
            />
        </div>);
}