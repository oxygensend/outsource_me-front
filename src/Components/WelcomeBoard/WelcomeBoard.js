import React from "react";
import {Button} from "../Button/Button";
import './WelcomeBoard.css'
import {ButtonLink} from "../Button/ButtonLink";
import {HomeImage} from "./HomeImage";
import {HomeContent} from "./HomeContent";


export class WelcomeBoard extends React.Component {


    render() {
        return (
            <div className={"home h-full md:grid-cols-2"}>
                <HomeImage/>
                <div className={"right-content"}>
                    <HomeContent>
                        <div className={"home-title"}>
                            <p>Wynajmij sie razem</p>
                        </div>
                        <div className={"home-paragraph"}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Vulputate lacinia nunc vestibuasdsadsadasdsad
                                asdasdsa
                                sadsadas
                                aslum fringilla consectetur.</p>
                        </div>
                        <div className={" mt-20 sm:grid-cols-6 sm:gap-4 sm:flex  sm:mb-24 sm:ml-10"}>
                            <ButtonLink class={"button-login justify-center "} text_color={"#000000"}
                                        value={"Zaloguj się"} route={"/logowanie"}/>
                            <ButtonLink class={"button-sign-in justify-center"} value={"Dołącz do nas"}
                                        route={"/rejestracja"}/>

                        </div>
                    </HomeContent>
                </div>
            </div>
        );
    }

}