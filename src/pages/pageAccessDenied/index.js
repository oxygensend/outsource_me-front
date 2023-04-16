import { RedirectPage } from '../../components/RedirectPage/RedirectPage';

export const PageAccessDenied = () => {
    return (
        <RedirectPage
            route={'/logowanie'}
            statusCode={403}
            info={'Brak dostępu'}
            content={' Nie masz praw do przeglądania tej strony.'}
            buttonValue={'Zaloguj się'}
        />
    );
};
