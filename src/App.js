import './App.css';
import {Navbar} from "./Components/Navbar/Navbar";
import {WelcomeBoard} from "./Components/WelcomeBoard/WelcomeBoard";
import {BrowserRouter as Router, Routes, Route, useParams} from "react-router-dom";
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
import {PageNotFound} from "./pages/pageNotFound";
import {ProtectedRoute} from "./Components/ProtecedRoute/ProtectedRoute";
import tokenService from "./services/tokenService";
import {ROLE_DEVELOPER, ROLE_ME, ROLE_PRINCIPLE} from "./helpers/Roles";

function App() {

    const user = tokenService.getLocalAccessToken();
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="*" element={<PageNotFound/>}/>
                <Route exact path={'/'} exact element={<WelcomeBoard/>}/>
                <Route element={<ProtectedRoute isAuthorizated={!user} redirect={'/'}/>}>
                    <Route path={"/rejestracja"} element={<Register/>}/>
                    <Route path={"/logowanie"} element={<Login/>}/>
                    <Route path={"/odzyskiwanie-hasla"} element={<PasswordReset/>}/>
                    <Route path={"/odzyskiwanie-hasla-email"} element={<PasswordSendLink/>}/>
                </Route>
                <Route path={"/profil/:id"} element={<Profile/>}/>
                <Route element={<ProtectedRoute isAuthorizated={user} checkRoles={[ROLE_ME]}/>}>
                    <Route path={"/profil/:id/edytuj/jezyki"} element={<ProfileEditLanguages/>}/>
                    <Route path={"/profil/:id/twoje-aplikacje"} element={<YourApplications/>}/>
                    <Route path={"/profil/:id/edytuj/technologie"} element={<ProfileEditTechnologies/>}/>
                    <Route path={"/profil/:id/edytuj/miejsca_pracy"} element={<ProfileEditJobPositions/>}/>
                    <Route path={"/profil/:id/edytuj/wyksztalcenie"} element={<ProfileEditEducation/>}/>
                </Route>
                <Route path={"/oferty-zlecen"} element={<JobOffers/>}/>
                <Route path={'/oferty-zlecen/:slug'} element={<JobOffer/>}/>
                <Route
                    element={<ProtectedRoute isAuthorizated={!user} checkRoles={[ROLE_ME, ROLE_PRINCIPLE]}/>}>
                    <Route path={"/profil/:id/twoje-oferty"} element={<YourJobOffers/>}/>
                    <Route path={'/profil/:id/twoje-oferty/:slug'} element={<JobOfferManagement/>}/>
                    <Route path={'/profil/:id/twoje-oferty/:slug/aplikacja/:id'} element={<Application/>}/>
                </Route>
                <Route path={'/nowe-zlecenie'} element={
                    <ProtectedRoute isAuthorizated={user} checkRoles={ROLE_PRINCIPLE}>
                        <NewJobOffer/>
                    </ProtectedRoute>
                }/>
                <Route path={'/oferty-zlecen/:slug/aplikuj'} element={
                    <ProtectedRoute isAuthorizated={user} checkRoles={ROLE_DEVELOPER}>
                        <ApplicateForJobOffer/>
                    </ProtectedRoute>
                }/>
                <Route path={"/powiadomienia"} element={
                    <ProtectedRoute isAuthorizated={user} redirect={'/logowanie'}>
                        <Notifications/>
                    </ProtectedRoute>
                }/>
            </Routes>
            {/*<Footer/>*/}
        </Router>
    );
}

export default App;
