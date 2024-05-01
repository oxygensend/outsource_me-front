import { JobOfferPage } from '../../components/JobOfferPage/JobOfferPage';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { defaultFiltersSettings, isInArray } from '../../services/utils';

export const JobOffers = () => {
    const [searchParams, setSearchParams] = useSearchParams(window.location.search);
    const [updatingUrlCompleted, setUpdatingUrlCompleted] = useState(null);
    const [filtersSettings, setFiltersSettings] = useState(defaultFiltersSettings);

    const [castToArray] = ['technologies', 'workTypes'];

    useEffect(() => {
        return () => {
            setFiltersBasedOfSearchParams();
        };
    }, []);

    const setFiltersBasedOfSearchParams = () => {
        let settings = {};
        console.log(searchParams)
        searchParams.forEach((param, key) => {
            //TODO change this shit
            if (param === 'developers') {
                settings[param] = true;
                settings['principles'] = false;
            } else if (param === 'principles') {
                settings['principles'] = true;
                settings['developers'] = false;
            } else {
                settings[key] = isInArray(key, castToArray) ? param.split(',').map(Number) : param;
            }
        });

        setFiltersSettings((prevState) => ({
            ...prevState,
            ...settings,
        }));

        setUpdatingUrlCompleted(true);
    };
    if (updatingUrlCompleted) {
        return (
            <JobOfferPage
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                defaultFiltersSettings={filtersSettings}
                updatingUrlCompleted={updatingUrlCompleted}
            />
        );
    } else {
        return null;
    }
};
