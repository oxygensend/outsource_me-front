import './Footer.css'
import facebook from '../../assets/icons/facebook.png';
import twitter from '../../assets/icons/twitter.png';
import linkedin from '../../assets/icons/linkedin.png';
import logo from '../../assets/images/logo_footer.png';

export const Footer = () => {

    return (
        <div className={"footer"}>
            <div className={"footer-ui"}>
                <img className={"footer-logo"} src={logo}></img>
                <div className={"footer-links ml-12"}>
                    <a className={"footer-text"} href={"/o-nas"}>
                        O nas
                    </a>
                    <a className={"footer-text"} href={"/faq"}>
                        FAQ
                    </a>
                    <a className={"footer-text"} href={"/regulamin"}>
                        Regulamin
                    </a>
                    <a className={"footer-text"} href={"/kontakt"}>
                        Kontakt
                    </a>
                </div>
                <div className={"footer-links "}>
                    <a className={"footer-text"} href={"/spolecznosc"}>
                        Społeczność
                    </a>
                    <a className={"footer-text"} href={"oferty-zlecen"}>
                        Oferty zleceń
                    </a>
                    <a className={"footer-text"} href={"/rejestracja"}>
                        Rejestracja
                    </a>
                    <a className={"footer-text"} href={"/logowanie"}>
                        Logowanie
                    </a>
                </div>
            </div>
            <hr/>
            <div className={"social-media"}>
                <img src={twitter} className={"icon-style icon-twitter"} alt={"twitter"}/>
                <img src={facebook} className={"icon-style icon-fb"} alt={"facebook"}/>
                <img src={linkedin} className={"icon-style icon-ln"} alt={"linkedin"}/>
            </div>
        </div>
    );
}