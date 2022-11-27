import {RedirectPage} from "../../components/RedirectPage/RedirectPage";

export const PageUnauthorizated = () => {
    return (
        <RedirectPage
            route={'/logowanie'}
            statusCode={401}
            info={"Tutaj konczy się Twoja przygoda."}
            content={"Aby przejść dalej musisz się zalogować."}
            buttonValue={'Zaloguj się'}
        />
    )
}