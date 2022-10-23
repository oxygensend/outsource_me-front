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
                <Route path={"/profile/:id"} element={<Profile/>}/>
                <Route path={"/oferty-zlecen"} element={<JobOffers/>}/>
            </Routes>
            {/*<Footer/>*/}
        </Router>
    );
}

export default App;
