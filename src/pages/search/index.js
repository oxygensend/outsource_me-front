import {Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getData} from "../../services/utils";
import {JobOfferSmallCard} from "../../components/JobOfferCard/JobOfferSmallCard";
import './index.css'
import {UserSmallCard} from "../../components/DeveloperCard/UserSmallCard";
import {SearchPageWrapper} from "../../components/Search/SearchPageWrapper";

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchText = searchParams.get('value');
    const [resultUsers, setResultUsers] = useState([]);
    const [resultJobOffers, setResultJobOffers] = useState([]);
    useEffect(() => {
        return (() => {
                Promise.all([
                    getData('/api/search/users?search=' + searchText),
                    getData('/api/search/job_offers?search=' + searchText)
                ]).then(([responseUsers, responseJobOffers]) => {
                    setResultJobOffers(responseJobOffers['hydra:member']);
                    setResultUsers(responseUsers['hydra:member']);
                });
        })
    }, []);


    return (
        <SearchPageWrapper searchText={searchText}>

            {!resultJobOffers.length && !resultUsers.length ?
                <p className="mb-8 text-center text-gray-500 mt-40 md:text-xl">Brak wyników</p> : null}

            {resultJobOffers.length > 0 ?
                <div>
                    <p className={"text-2xl font-bold pb-2 pt-5 pl-1 mb-2 ml-20 "}>Oferty zleceń</p>
                    <div className={"flex flex-col items-center"}>
                        {resultJobOffers.slice(0, 3).map((offer, i) => {
                            return (
                                <JobOfferSmallCard jobOffer={offer}
                                                   key={i}
                                                   id={i}
                                                   description={true}
                                                   className={"search-card "}/>
                            )
                        })}
                    </div>
                    {resultJobOffers.length > 3 ?
                        <Link
                            className={"red-font mt-5 ml-24 cursor-pointer hover:underline hover:text-red-400"}
                            to={"/wyszukaj/oferty-zlecen?value=" + searchText}
                            state={resultJobOffers}
                            children={"  Pokaż więcej..."}/>
                        : null}
                </div> : null
            }

            {resultUsers.length > 0 ?
                <div className={"pb-14"}>
                    <p className={"text-2xl font-bold pb-2 pt-5 pl-1 mb-2 ml-20 "}>Użytkownicy</p>
                    <div className={"flex flex-col items-center"}>
                        {resultUsers.slice(0, 3).map((user, i) => {
                            return (
                                <UserSmallCard
                                    user={user}
                                    key={i}
                                    className={"search-card "}/>
                            )
                        })}

                    </div>
                    {resultUsers.length > 3 ?
                        <Link
                            className={"red-font mt-5 pt-3 ml-24 cursor-pointer hover:underline hover:text-red-400"}
                            to={"/wyszukaj/uzytkownicy?value=" + searchText}
                            state={resultUsers}
                            children={"  Pokaż więcej..."}/>
                        : null}

                </div> : null}

        </SearchPageWrapper>
    )

}