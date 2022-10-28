import {FilterSection} from "./FilterSection";
import {FilterItem} from "./FilterItem";
import {useState} from "react";
import {isInArray, searchArray} from "../../services/utils";

export const Technologies = ({technologiesList, onFilterClick, technologies}) => {

    const [search, setSearch] = useState('')
    const [results, setResults] = useState(null);
    const [selectedTechnologies] = useState(technologies ?? []);

    const onChangeHandler = async (event) => {

        const search = event.target.value.toLowerCase();
        setSearch(search);

        if (search === '') {
            return setResults(null);
        }

        const results = searchArray(search, technologiesList, 'name')


        setResults(results.slice(1, 6));
    }

    const onClickTechnology = (technology) => {

        if (isInArray(technology.id, selectedTechnologies)) {
            const index = selectedTechnologies.indexOf(technology.id);
            selectedTechnologies.splice(index, 1);
        } else {
            selectedTechnologies.push(technology.id);
        }

        onFilterClick('technologies', selectedTechnologies);
    }

    return (
        <FilterSection subTitle={"Technologie"}>
            <input
                className={"search"}
                type="text"
                placeholder="Szukaj..."
                value={search}
                onChange={onChangeHandler}
            />
            <div className={"flex flex-row gap-2  mt-5 flex-wrap mb-12 overflow-y-scroll max-h-40 cur"}>

                {results ? results.map((technology, i) => {
                        return (<FilterItem
                            key={i}
                            name={technology.name}
                            onClick={() => onClickTechnology(technology)}
                            active={isInArray(technology.id, selectedTechnologies)}
                        />)
                    }) :
                    technologiesList ? technologiesList.map((technology, i) => {
                        return (<FilterItem
                            key={i}
                            name={technology.name}
                            onClick={() => onClickTechnology(technology)}
                            active={isInArray(technology.id, selectedTechnologies)}
                        />);
                    }) : null
                }

            </div>
        </FilterSection>

    );

}