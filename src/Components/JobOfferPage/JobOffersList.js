import {JobOfferCard} from "../JobOfferCard/JobOfferCard";
import InfiniteScroll from "react-infinite-scroller";
import loader from '../../assets/images/loader.gif'
import {DeveloperCard} from "../DeveloperCard/DeveloperCard";
import tokenService from "../../services/tokenService";

export const JobOffersList = ({
                                  filtersModal,
                                  jobOffers,
                                  getJobOffers,
                                  hasMore,
                                  developers,
                                  principles,
                                  order
                              }) => {


    if (jobOffers) {

        return (
            <div
                className={'md:col-start-5 md:col-end-13 xl:col-start-5 xl:col-end-11 md:mr-12 xl:mr-0  md:flex ' + (!filtersModal ? 'hidden' : null)}>

                {(order === 'for-you' && (!tokenService.getLocalAccessToken()
                    || (developers === true && tokenService.getUser().accountType === 'Developer')
                    || (principles === true && tokenService.getUser().accountType === 'Principle')
                ))

                    ?
                    <div className=" relative  top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2  mt-40">
                        <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                            <span className="text-red-500">Błąd ładowania!</span>
                        </p>
                        <p className="mb-8 text-center text-gray-500 md:text-lg">
                            Ten fitr jest dla Ciebie niedostępny
                        </p>
                    </div>
                    :

                    <InfiniteScroll
                        pageStart={1}
                        loadMore={getJobOffers}
                        hasMore={hasMore}
                        loader={<img src={loader} alt={"loader"} className={"loader"} key={-1} width={40} height={40}/>}
                        useWindow={true}
                        threshold={1500}
                    >
                        {principles ?
                            jobOffers.map((jobOffer, i) => {
                                return (
                                    <JobOfferCard
                                        key={i}
                                        jobOffer={jobOffer}

                                    />
                                );

                            }) :
                            jobOffers.map((jobOffer, i) => {
                                return (
                                    <DeveloperCard
                                        key={i}
                                        developer={jobOffer}

                                    />
                                );
                            })
                        }
                    </InfiniteScroll>
                }
            </div>
        );
    } else {
        return null;
    }
}