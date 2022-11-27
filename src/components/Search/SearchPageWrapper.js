import {Searchbar} from "./Searchbar";
import parse from "html-react-parser";

export const SearchPageWrapper = ({children, searchText}) => {
    return (
        <div className={"profile-container full-height"}>

            <Searchbar
                className={"top-10  mb-10 relative hide-900"}
                search={searchText}
            />

            <p className={"text-2xl pb-2 pt-5 pl-1 mb-2 text-center hide-320"}>{parse("Wyniki dla <b>" + searchText + "</b>")}</p>

            {children}

        </div>
    )
}