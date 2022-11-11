import './App.css';
import {Navbar} from "./Components/Navbar/Navbar";
import {WelcomeBoard} from "./Components/WelcomeBoard/WelcomeBoard";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Footer} from "./Components/Footer/Footer";
import {Register} from "./pages/register";
import {Login} from "./pages/login";
import {PasswordReset} from "./pages/passwordReset/passwordResetExecute";
import {PasswordSendLink} from "./pages/passwordReset/passwordSendLink";
import {Profile} from "./pages/profile";
import {JobOffers} from "./pages/jobOffers";
import {ProfileEditTechnologies} from "./pages/profileEditTechnologies";
import {ProfileEditLanguages} from "./pages/profileEditLanguages";
import {ProfileEditJobPositions} from "./pages/profileEditJobPositions";
import {ProfileEditEducation} from "./pages/profileEditEducation";
import {JobOffer} from "./pages/jobOffer";
import {ApplicateForJobOffer} from "./pages/applicateForJobOffer";
import {YourApplications} from "./pages/yourApplications";
import {YourJobOffers} from "./pages/yourJobOffers";
import {JobOfferManagement} from "./pages/jobOfferManagement";
import {NewJobOffer} from "./pages/newJobOffer";
import {Application} from "./pages/application";
import {Notifications} from "./pages/notifications";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route exact path={'/'} exact element={<WelcomeBoard/>}/>
                <Route path={"/rejestracja"} element={<Register/>}/>
                <Route path={"/logowanie"} element={<Login/>}/>
                <Route path={"/odzyskiwanie-hasla"} element={<PasswordReset/>}/>
                <Route path={"/odzyskiwanie-hasla-email"} element={<PasswordSendLink/>}/>
                <Route path={"/profil/:id"} element={<Profile/>}/>
                <Route path={"/profil/:id/edytuj/jezyki"} element={<ProfileEditLanguages/>}/>
                <Route path={"/profil/:id/edytuj/technologie"} element={<ProfileEditTechnologies/>}/>
                <Route path={"/profil/:id/edytuj/miejsca_pracy"} element={<ProfileEditJobPositions/>}/>
                <Route path={"/profil/:id/edytuj/wyksztalcenie"} element={<ProfileEditEducation/>}/>
                <Route path={"/oferty-zlecen"} element={<JobOffers/>}/>
                <Route path={'/oferty-zlecen/:slug'} element={<JobOffer/>}/>
                <Route path={'/nowe-zlecenie'} element={<NewJobOffer/>}/>
                <Route path={'/twoje-oferty/:slug'} element={<JobOfferManagement/>}/>
                <Route path={'/twoje-oferty/:slug/aplikacja/:id'} element={<Application/>}/>
                <Route path={'/oferty-zlecen/:slug/aplikuj'} element={<ApplicateForJobOffer/>}/>
                <Route path={"/profil/:id/twoje-aplikacje"} element={<YourApplications/>}/>
                <Route path={"/profil/:id/twoje-oferty"} element={<YourJobOffers/>}/>
                <Route path={"/powiadomienia"} element={<Notifications/>}/>
            </Routes>
            {/*<Footer/>*/}
        </Router>
    );
}

export default App;
