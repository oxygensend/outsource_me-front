import { FilterSection } from './FilterSection';
import { FilterItem } from './FilterItem';
import { useState } from 'react';
import { isInArray, searchArray } from '../../services/utils';
import { TechnologiesBox } from './TechnologiesBox';

export const Technologies = ({ technologiesList, onFilterClick, technologies }) => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState(null);
    const [selectedTechnologies] = useState(technologies ?? []);

    const onChangeHandler = async (event) => {
        const search = event.target.value.toLowerCase();
        setSearch(search);

        if (search === '') {
            return setResults(null);
        }

        const results = searchArray(search, technologiesList, 'name');

        setResults(results.slice(0, 5));
    };

    const onClickTechnology = (technology) => {
        if (isInArray(technology.name, selectedTechnologies)) {
            const index = selectedTechnologies.indexOf(technology.name);
            selectedTechnologies.splice(index, 1);
        } else {
            selectedTechnologies.push(technology.name);
        }

        onFilterClick('technologies', selectedTechnologies);
    };

    return (
        <FilterSection subTitle={'Technologie'}>
            <input className={'search'} type='text' placeholder='Szukaj...' value={search} onChange={onChangeHandler} />
            <TechnologiesBox
                results={results}
                technologiesList={technologiesList}
                onClickTechnology={onClickTechnology}
                selectedTechnologies={selectedTechnologies}
            />
        </FilterSection>
    );
};
