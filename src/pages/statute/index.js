import parse from 'html-react-parser';

export const Statute = () => {
    const statue =
        '<div><b>Regulamin strony Outsource me:</b><br><br></div><ol><li>Postanowienia ogólne:<br>a) Strona Outsource me umożliwia użytkownikom wyszukiwanie i zgłaszanie zleceń dla programistów.<br>b) Korzystanie z serwisu jest dobrowolne i oznacza akceptację regulaminu.<br>c) Użytkownik zobowiązany jest do przestrzegania regulaminu i przepisów prawa.</li><li>Rejestracja i korzystanie z serwisu:<br>a) Rejestracja w serwisie jest bezpłatna.<br>b) Użytkownik zobowiązany jest do podania prawdziwych danych podczas rejestracji.<br>c) Użytkownik ma obowiązek dbania o bezpieczeństwo swojego konta i hasła.<br>d) Serwis zastrzega sobie prawo do usunięcia konta użytkownika bez podania przyczyny.</li><li>Zgłaszanie zleceń:<br>a) Zlecenia mogą zgłaszać tylko zarejestrowani użytkownicy.<br>b) Zlecenie powinno być opisane w sposób precyzyjny i rzetelny.<br>c) Zlecenie nie może naruszać przepisów prawa ani dobrych obyczajów.<br>d) Serwis zastrzega sobie prawo do odrzucenia zgłoszenia bez podania przyczyny.</li><li>Realizacja zleceń:<br>a) Użytkownik zgłaszający zlecenie ma prawo do wyboru wykonawcy.<br>b) W trakcie realizacji zlecenia użytkownik jest zobowiązany do zachowania poufności informacji przekazywanych przez zleceniodawcę.<br>c) Użytkownik wykonujący zlecenie zobowiązany jest do przestrzegania terminów i wymagań określonych przez zleceniodawcę.<br>d) Serwis nie ponosi odpowiedzialności za jakość wykonania zlecenia ani za szkody poniesione przez zleceniodawcę lub wykonawcę.</li><li>Prawa autorskie:<br>a) Użytkownik zgłaszający zlecenie gwarantuje, że nie narusza praw autorskich lub innych praw własności intelektualnej.<br>b) Użytkownik wykonujący zlecenie zobowiązany jest do przestrzegania praw autorskich oraz do nieudostępniania informacji przekazanych przez zleceniodawcę bez jego zgody.</li><li>Postanowienia końcowe:<br>a) Serwis zastrzega sobie prawo do zmiany regulaminu w każdym czasie.<br>b) Wszelkie spory wynikłe z korzystania z serwisu rozstrzygane będą przez właściwe sądy powszechne.<br>c) Regulamin wchodzi w życie od momentu opublikowania na stronie.</li></ol>';

    return (
        <div className={'profile-container full-height'}>
            <div className='paragraph'>{parse(statue)}</div>
        </div>
    );
};
