import React from "react";
import {useState, useEffect} from 'react';

import './Navbar.css';
import Wordmark from '../../assets/images/Wordmark.svg'
import OutsourceMe from '../../assets/images/Outsource me.png'
import OutsourceMe_mobile from '../../assets/images/logo-mobile.png'
import menu from '../../assets/images/menu.png'


import {Button} from "../Button/Button";
import {DashboardMenu, NavbarMenu, NavLink, Searchbar, Watermark} from "./NavbarElements";
import {ButtonLink} from "../Button/ButtonLink";

export class Navbar extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            login: 0,
            showMenu: false
        }
    }


    handleMouseClick() {
        this.setState({showMenu: !this.state.showMenu});
    }

    render() {
        return (
            <nav className="navbar">
                <div className={"nav-menu-mobile"} onClick={() => this.handleMouseClick()}>
                    <img src={menu} alt={"menu"}/>
                </div>
                <Watermark
                    image={OutsourceMe}
                    image_mobile={OutsourceMe_mobile}
                    alt={"watermark-outsourceme"}
                />
                {this.state.showMenu ?
                    <DashboardMenu/>
                    : null}
                {/*<Searchbar/>*/}
                <div className={"nav-menu"}>
                    <NavbarMenu/>
                    {this.state.login ?
                        <ButtonLink value={"Dołącz do nas"} route={"/rejestracja"}/> :
                        <ButtonLink value={"Dołącz do nas"} route={"/rejestracja"}/>
                    }
                </div>
            </nav>

        );
    }
}


function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
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