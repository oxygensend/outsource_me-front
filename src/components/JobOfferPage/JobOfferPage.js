import { useEffect, useState } from 'react';
import filter_icon from '../../assets/icons/filter-24.png';
import { FiltersModal } from '../FiltersModal/FiltersModal';
import { JobOffersList } from './JobOffersList';
import './index.css';
import {
    developersStringPluralForm,
    generateQueryParameters,
    getData,
    jobOffersStringPluralForm,
    scrollToTop,
} from '../../services/utils';

export const JobOfferPage = ({ defaultFiltersSettings, searchParams, updatingUrlCompleted, setSearchParams }) => {
    const [filtersModal, setFiltersModal] = useState(true);
    const [reload, setReload] = useState(false);
    const [filtersSettings, setFiltersSettings] = useState(defaultFiltersSettings);
    const [jobOffers, setJobOffers] = useState([]);
    const [totalNumberOfItems, setTotalNumberOfItems] = useState();
    const [currentPaginationUrl, setCurrentPaginationUrl] = useState('/api/job_offers');
    const [hasMore, setHasMore] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [addressesList, setAddressesList] = useState([]);
    const [technologiesList, setTechnologiesList] = useState();
    const [workTypesList, setWorkTypesList] = useState();

    /* Data readers */

    useEffect(() => {
        return () => {
            Promise.all([
                getData('/api/addresses'),
                getData('/api/technologies?order[featured]=desc'),
                getData('/api/work_types'),
            ]).then(([addresses, technologies, work_types]) => {
                setAddressesList(addresses['hydra:member']);
                setTechnologiesList(technologies['hydra:member']);
                setWorkTypesList(work_types['hydra:member']);
            });
        };
    }, []);

    useEffect(() => {
        if (reload) {
            updateQueryParams();
            setReload(false);
            return getJobOffers(true);
        }
    }, [reload, setReload]);

    useEffect(() => {
        return () => {
            getJobOffers();
        };
    }, [updatingUrlCompleted]);

    /* fetch job offer data  */
    const getJobOffers = (clear = false) => {
        const params = generateQueryParameters(filtersSettings);
        const url = (isInitialLoad ? updateEndpointUrl() : currentPaginationUrl) + (isInitialLoad ? params : '');

        getData(url)
            .then((response) => {
                if (response !== undefined) {
                    const incomingData = response['hydra:member'];

                    setCurrentPaginationUrl(response['hydra:view']['hydra:next']);
                    setTotalNumberOfItems(response['hydra:totalItems']);
                    setIsInitialLoad(false);

                    if (!response['hydra:view']['hydra:next']) {
                        setHasMore(false);
                    } else {
                        setHasMore(true);
                    }

                    if (clear === true) {
                        setJobOffers(incomingData);
                        return;
                    }

                    const items = [...jobOffers, ...incomingData];
                    setJobOffers(items);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    /* Handler that reload page after clicking specific filter */
    const onFilterClick = (key, value) => {
        setReload(true);
        setIsInitialLoad(true);
        setHasMore(false);
        scrollToTop();

        return setFiltersSettings((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const updateEndpointUrl = () => {
        const { developers } = filtersSettings;
        return developers ? '/api/users?accountType=Developer&lookingForJob=true' : '/api/job_offers?';
    };

    const updateQueryParams = () => {
        const { address, developers, order, technologies, principles, workTypes } = filtersSettings;
        let searchQuery = `${order ? '?order=' + order : ''}`;

        if (developers) {
            searchQuery += searchQuery.startsWith('?') ? '&offers=developers' : '?offers=developers';
        }

        if (principles) {
            searchQuery += searchQuery.startsWith('?') ? '&offers=principles' : '?offers=principles';
        }

        if (technologies.length > 0)
            searchQuery += searchQuery.startsWith('?')
                ? '&technologies=' + technologies
                : '?technologies=' + technologies;
        if (address) searchQuery += searchQuery.startsWith('?') ? '&address=' + address : '?address=' + address;
        if (workTypes.length > 0)
            searchQuery += searchQuery.startsWith('?') ? '&workTypes=' + workTypes : '?address=' + workTypes;

        setSearchParams(searchQuery);
    };

    return (
        <div className={'md:grid md:grid-cols-12  mt-20 md:mt-24'}>
            <div
                className={
                    'md:col-start-11 md:col-end-13 md:ml-10 xl:col-start-10 xl:col-end-12 xl:ml-5 xl:mb-2 mobile-hide2'
                }
            >
                <p style={{ color: '#7C8DB0' }}>
                    {totalNumberOfItems
                        ? totalNumberOfItems +
                          (filtersSettings.principles
                              ? jobOffersStringPluralForm(totalNumberOfItems)
                              : developersStringPluralForm(totalNumberOfItems))
                        : null}
                </p>
            </div>
            <div className={'mobile-filters-panel ' + (!filtersModal ? 'mobile-hide' : null)}>
                <div className={'flex flex-row gap-2 cursor-pointer'} onClick={() => setFiltersModal(false)}>
                    <img src={filter_icon} alt={'filter_icon'} />
                    <p className={'font-medium text-xl'}>Filtry</p>
                </div>
                <div className={'gap-10'}>
                    <p style={{ color: '#7C8DB0' }}>{totalNumberOfItems ? totalNumberOfItems + ' zleceń' : null}</p>
                </div>
            </div>

            <FiltersModal
                hide={filtersModal}
                onClick={setFiltersModal}
                class={'md:hidden'}
                onFilterClick={onFilterClick}
                filtersSettings={filtersSettings}
                addressesList={addressesList}
                technologiesList={technologiesList}
                workTypesList={workTypesList}
            />

            <FiltersModal
                hide={false}
                onClick={setFiltersModal}
                className={'mobile-hide2'}
                onFilterClick={onFilterClick}
                filtersSettings={filtersSettings}
                addressesList={addressesList}
                technologiesList={technologiesList}
                workTypesList={workTypesList}
            />

            <JobOffersList
                filtersModal={filtersModal}
                currentPaginationUrl={currentPaginationUrl}
                jobOffers={jobOffers}
                getJobOffers={getJobOffers}
                hasMore={hasMore}
                developers={filtersSettings.developers}
                principles={filtersSettings.principles}
                order={filtersSettings.order}
            />
        </div>
    );
};
