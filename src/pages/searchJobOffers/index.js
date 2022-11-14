import { useLocation, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getData} from "../../services/utils";
import {JobOfferSmallCard} from "../../Components/JobOfferCard/JobOfferSmallCard";
import {SearchPageWrapper} from "../../Components/Search/SearchPageWrapper";

export const SearchJobOffers = () => {
    const location = useLocation();
    const [results, setResults] = useState(location.state);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchText = searchParams.get('value');

    useEffect(() => {
        return () => {
            if (!location.state) {
                getData('/api/search/job_offers?search=' + searchText).then(response => {
                    setResults(response['hydra:member']);
                })
            }
        };
    }, []);

    console.log(results);

    if (searchText) {
        return (
            <SearchPageWrapper searchText={searchText}>
                {!results.length ?
                    <p className="mb-8 text-center text-gray-500 mt-40 md:text-xl">Brak wyników</p> : null}

                {results.length > 0 ?
                    <div className={"pb-14"}>
                        <p className={"text-2xl font-bold pb-2 pt-5 pl-1 mb-2 ml-20 "}>Oferty zleceń</p>
                        <div className={"flex flex-col items-center"}>
                            {results.map((jobOffer, i) => {
                                return (
                                    <JobOfferSmallCard jobOffer={jobOffer} id={i} className={"search-card "}/>
                                )
                            })}

                        </div>


                    </div> : null}


            </SearchPageWrapper>
        )
    } else {
        return null;
    }
}