import './App.css';
import {Navbar} from "./Components/Navbar/Navbar";
import {WelcomeBoard} from "./Components/WelcomeBoard/WelcomeBoard";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Footer} from "./Components/Footer/Footer";
import {Register} from "./pages/register";
import {Login} from "./pages/login";
import {GOOGLE_URL} from "./config";
import {PasswordReset} from "./pages/passwordReset/passwordResetExecute";
import {PasswordSendLink} from "./pages/passwordReset/passwordSendLink";
import {Profile} from "./pages/profile";
import {JobOffers} from "./pages/jobOffers";
import {ProfileEditTechnologies} from "./pages/profileEditTechnologies";
import {ProfileEditLanguages} from "./pages/profileEditLanguages";

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
                {/*<Route path={"/profil/:id/dodaj/technologie"} element={<ProfileAddTechnology/>}/>*/}
                {/*<Route path={"/profil/:id/dodaj/wyksztalcenie"} element={<ProfileAddExpirience/>}/>*/}
                {/*<Route path={"/profil/:id/dodaj/miejsce_pracy"} element={<ProfileAddJobPosition/>}/>*/}
                <Route path={"/profil/:id/edytuj/jezyki"} element={<ProfileEditLanguages/>}/>
                <Route path={"/profil/:id/edytuj/technologie"}  element={<ProfileEditTechnologies/>}/>
                <Route path={"/oferty-zlecen"} element={<JobOffers/>}/>
            </Routes>
            {/*<Footer/>*/}
        </Router>
    );
}

export default App;
