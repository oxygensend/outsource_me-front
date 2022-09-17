import React from "react";
import { useState, useEffect } from 'react';

import './Navbar.css';
import Wordmark from '../../assets/images/Wordmark.svg'
import OutsourceMe from '../../assets/images/Outsource me.png'
import OutsourceMe_mobile from '../../assets/images/logo-mobile.png'
import menu from '../../assets/images/menu.png'


import {Button} from "../Button/Button";
import {NavLink, Searchbar, Watermark} from "./NavbarElements";
import {ButtonLink} from "../Button/ButtonLink";

export class Navbar extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            login: 0,
        }
    }


    render() {
        return (
            <nav className="navbar">
                <Watermark
                    image={OutsourceMe}
                    image_mobile={OutsourceMe_mobile}
                    image_menu={menu}
                    alt={"watermark-outsourceme"}
                />
                {/*<Searchbar/>*/}
                <div className={"nav-menu"}>
                    <div className={"nav-wrapper"}>
                        {this.state.login ? (
                            <NavLink route={'/'}>
                                Strona główna
                            </NavLink>
                        ) : (
                            <NavLink route={'/o-nas'}>
                                O nas
                            </NavLink>
                        )
                        }
                        <NavLink route={'/spolecznosc'}>
                            Społeczność
                        </NavLink>
                        <NavLink route={'/oferty-zlecen'}>
                            Oferty zleceń
                        </NavLink>
                        {this.state.login ? (
                            <NavLink route={'/zaloguj-sie'}>
                                Powiadomienia
                            </NavLink>
                        ) : (
                            <NavLink route={'/zaloguj-sie'}>
                                Zaloguj się
                            </NavLink>
                        )
                        }</div>
                    {this.state.login ? <ButtonLink value={"Dołącz do nas"} route={"/rejestracja"}/> : <ButtonLink value={"Dołącz do nas"} route={"/rejestracja"}/>}
                </div>
            </nav>

        );
    }
}


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}