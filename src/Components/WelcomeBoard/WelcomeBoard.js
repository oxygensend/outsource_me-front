import React from "react";
import {SubmitButton} from "../Button/SubmitButton";
import './WelcomeBoard.css'
import {ButtonLink} from "../Button/ButtonLink";
import {HomeImage} from "./HomeImage";
import {HomeContent} from "./HomeContent";
import tokenService from "../../services/tokenService";


export class WelcomeBoard extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            isAuthenticated: tokenService.getLocalAccessToken()
        }
    }

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

                            {!this.state.isAuthenticated ?
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Vulputate lacinia nunc vestibuasdsadsadasdsad
                                    asdasdsa
                                    sadsadas
                                    aslum fringilla consectetur.</p>
                                :
                                <>
                                <p className={"mb-6"}>
                                    Where can I get some?

                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                                <ButtonLink
                                route={'/oferty-zlecen'}
                                value={'Nasze oferty'}
                                />
                                </>
                            }
                        </div>
                        {!this.state.isAuthenticated ?
                            <div className={" mt-20 sm:grid-cols-6 sm:gap-4 sm:flex  sm:mb-24 sm:ml-10"}>
                                <ButtonLink class={"button-login justify-center "}
                                            text_color={"#000000"}
                                            value={"Zaloguj się"}
                                            route={"/logowanie"}/>
                                <ButtonLink class={"button-sign-in justify-center"} value={"Dołącz do nas"}
                                            route={"/rejestracja"}/>

                            </div>
                            : null
                        }
                    </HomeContent>
                </div>
            </div>
        );
    }

}