import { Search } from './Search';
import { TechnologiesBox } from '../FiltersModal/TechnologiesBox';
import { useEffect, useState } from 'react';
import { getData, isInArray, searchArray } from '../../services/utils';

export const TechnologySearch = ({ selectedTechnologies, setSelectedTechnologies }) => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState(null);

    const [technologiesList, setTechnologiesList] = useState([]);
    const [reload, setReload] = useState([]);

    useEffect(() => {
        setReload(false);
    }, [reload]);

    useEffect(() => {
        return () => {
            getData('/static-data/technologies').then((technologies) => {
                setTechnologiesList(technologies);
            });
        };
    }, []);

    const onClickTechnology = (technology) => {
        if (isInArray(technology.name, selectedTechnologies)) {
            const index = selectedTechnologies.indexOf(technology.name);
            selectedTechnologies.splice(index, 1);
        } else {
            selectedTechnologies.push(technology.name);
        }

        setReload(true);
    };

    const onChangeHandler = async (event) => {
        const search = event.target.value.toLowerCase();
        setSearch(search);

        if (search === '') {
            return setResults(null);
        }

        const results = searchArray(search, technologiesList, 'name');

        setResults(results.slice(0, 5));
    };
    return (
        <div>
            <Search value={search} onChangeHandler={onChangeHandler} />

            <TechnologiesBox
                results={results}
                technologiesList={technologiesList}
                onClickTechnology={onClickTechnology}
                selectedTechnologies={selectedTechnologies}
                filterProperty={'name'}
            />
        </div>
    );
};
