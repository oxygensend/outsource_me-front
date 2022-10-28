import {JobOfferCard} from "../JobOfferCard/JobOfferCard";
import InfiniteScroll from "react-infinite-scroller";
import loader from '../../assets/images/loader.gif'

export const JobOffersList = ({filtersModal, jobOffers, getJobOffers, hasMore}) => {


    if (jobOffers) {

        return (
            <div
                className={'md:col-start-5 md:col-end-13 xl:col-start-5 xl:col-end-11 md:mr-12 xl:mr-0  md:flex' + (!filtersModal ? 'hidden' : null)}>


                <InfiniteScroll
                    pageStart={1}
                    loadMore={getJobOffers}
                    hasMore={hasMore}
                    loader={<img src={loader} alt={"loader"} className={"loader"} key={-1} width={40} height={40}/>}
                    useWindow={true}
                >
                    {jobOffers.map((jobOffer, i) => {
                        return (
                            <JobOfferCard
                                key={i}
                                jobOffer={jobOffer}

                            />
                        );
                    })}
                </InfiniteScroll>

            </div>
        );
    } else {
        return null;
    }
}