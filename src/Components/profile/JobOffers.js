import {ProfileModule} from "./ProfileModule";
import {JobOfferCard} from "../JobOfferCard/JobOfferCard";

export const JobOffers = ({personalData}) => {

    console.log(personalData);
    return (
        <ProfileModule
            title={"Dostępne oferty"}
            breakLine={true}
            // onClickAdd={onClickAdd}
            personalData={personalData}
            editRedirectUrl={"/profil/me/edytuj/wyksztalcenie"}
        >
            {personalData.jobOffers.map((jobOffer, i) => {
                if (jobOffer['@type'] === 'JobOffer') {
                    return (
                        <JobOfferCard
                            key={i}
                            jobOffer={jobOffer}

                        />
                    );
                } else {
                    return null;
                }

            })
            }

        < /ProfileModule>
    );
}
