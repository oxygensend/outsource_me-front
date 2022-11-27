import {RedirectPage} from "../../components/RedirectPage/RedirectPage";

export const PageNotFound = () => {

    return (

        <RedirectPage
            route={'/'}
            statusCode={404}
            info={"Strona nie istnieje"}
            content={"Strona którą próbujesz znaleźć nie istnieje."}
            buttonValue={'Strona główna'}
            />
    )
}