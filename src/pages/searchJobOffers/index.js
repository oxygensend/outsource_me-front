import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '../../services/utils';
import { JobOfferSmallCard } from '../../components/JobOfferCard/JobOfferSmallCard';
import { SearchPageWrapper } from '../../components/Search/SearchPageWrapper';
import InfiniteScroll from 'react-infinite-scroller';
import loader from '../../assets/images/loader.gif';
import { UserSmallCard } from '../../components/DeveloperCard/UserSmallCard';

export const SearchJobOffers = () => {
    const location = useLocation();
    const [results, setResults] = useState(location.state ?? []);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchText = searchParams.get('value');
    const [hasMore, setHasMore] = useState(false);
    const fetchUrl = '/job-offers/search?query=' + searchText + '&page=';
    const [page, setPage] = useState(1);
    const [currentPaginationUrl, setCurrentPaginationUrl] = useState(fetchUrl + 1);

    useEffect(() => {
        return () => {
            if (!location.state) {
                getJobOffers();
            } else {
                setPage(1);
                setHasMore(true);
                setCurrentPaginationUrl(fetchUrl + 1);
            }
        };
    }, []);

    const getJobOffers = (clear = false) => {
        getData(currentPaginationUrl)
            .then((response) => {
                if (response !== undefined) {
                    const incomingData = response.data;

                    const hasMorePages = (response['totalPages'] - response['currentPage']) > 0
                    if (hasMorePages) {
                        const nextPage = page + 1;
                        setPage((prev) => prev + 1)
                        setCurrentPaginationUrl(fetchUrl + nextPage);
                        setHasMore(true);
                    } else {
                        setHasMore(false);
                    }

                    if (clear === true) {
                        setResults(incomingData);
                        return;
                    }

                    const items = [...results, ...incomingData];
                    setResults(items);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (searchText) {
        return (
            <SearchPageWrapper searchText={searchText}>
                {!results.length ? (
                    <p className='mb-8 text-center text-gray-500 mt-40 md:text-xl'>Brak wyników</p>
                ) : null}

                {results.length > 0 ? (
                    <div className={'pb-14'}>
                        <p className={'text-2xl font-bold pb-2 pt-5 pl-1 mb-2 ml-20 '}>Oferty zleceń</p>
                        <InfiniteScroll
                            pageStart={2}
                            loadMore={getJobOffers}
                            hasMore={hasMore}
                            loader={
                                <img src={loader} alt={'loader'} className={'loader'} key={-1} width={40} height={40} />
                            }
                            useWindow={true}
                        >
                            <div className={'flex flex-col items-center'}>
                                {results.map((jobOffer, i) => {
                                    return (
                                        <JobOfferSmallCard
                                            jobOffer={jobOffer}
                                            key={i}
                                            id={i}
                                            className={'search-card '}
                                        />
                                    );
                                })}
                            </div>
                        </InfiniteScroll>
                    </div>
                ) : null}
            </SearchPageWrapper>
        );
    } else {
        return null;
    }
};
