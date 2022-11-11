import gear from "../../assets/icons/gear-24.svg";
import search from "../../assets/icons/search-24.svg";
import bin from "../../assets/icons/no-entry-24.svg";
import check from "../../assets/icons/circle-check-24.svg";
import calendar from "../../assets/icons/calendar.png";
import moment from "moment/moment";

export const JobOfferStatistics = ({jobOffer, setShowModals}) => {

    const onClickOpenModal = (modalName) => {
        setShowModals((prevState) => ({...prevState, [modalName]: true}));
    }

    const onClickPreviewOffer = () => {
        window.location.href = '/oferty-zlecen/' + jobOffer.slug;
    }

    return (
        <div className={"text-center"}>

            <p className={"joboffer-title-font pt-10"}>{jobOffer.name}</p>

            <p className={"application-font"}>{jobOffer.numberOfApplications + ' aplikacje'}</p>
            <p className={"text-red-500 font-medium"}>
                {'Oferta została wyświetlona ' + jobOffer.redirectCount + ' razy'}
            </p>

            <div className={"flex flex-row gap-2 mt-4 justify-center"}>
                <img src={calendar} alt={"calendar"} style={{maxHeight: '16px'}}/>
                <p className={"font-time italic bottom-0.5 relative"}>Oferta
                    wygasa za {moment(jobOffer.validTo).fromNow()} </p>
            </div>
            <div className={"flex flex-row gap-4 mt-4 justify-center"}>

                <img src={gear}
                     className={" cursor-pointer mt-0.5"}
                     alt={"settings"}
                     onClick={() => onClickOpenModal('editOfferModal')}
                />
                {jobOffer.archived ?
                    <img src={check}
                         className={" cursor-pointer mt-0.5"}
                         alt={"delete"}
                         onClick={() => onClickOpenModal('openOfferModal')}
                    /> :
                    <img src={bin}
                         className={" cursor-pointer mt-0.5"}
                         alt={"delete"}
                         onClick={() => onClickOpenModal('closeOfferModal')}
                    />
                }
                <img src={search}
                     className={" cursor-pointer mt-0.5"}
                     alt={"preview"}
                     onClick={() => onClickPreviewOffer()}
                />
            </div>
        </div>
    );
}