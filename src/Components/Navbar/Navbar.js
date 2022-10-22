import React from "react";
import {useState, useEffect} from 'react';
import './Navbar.css';
import OutsourceMe from '../../assets/images/Outsource me (1).png'
import OutsourceMe_mobile from '../../assets/images/logo-mobile.png'
import menu from '../../assets/images/menu.png'
import {DashboardMenu, NavbarMenu, NavLink, Searchbar, Watermark} from "./NavbarElements";
import {ButtonLink} from "../Button/ButtonLink";
import tokenService from "../../services/tokenService";
import avatar from '../../assets/images/avatar.png';

export class Navbar extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            showMenu: false,
            isAuthenticated: tokenService.getLocalAccessToken()
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
                    <DashboardMenu login={this.state.isAuthenticated}/>
                    : null}
                {/*<Searchbar/>*/}
                <div className={"nav-menu"}>
                    <NavbarMenu login={this.state.isAuthenticated}/>
                    {!this.state.isAuthenticated ?
                        <ButtonLink value={"Dołącz do nas"} route={"/rejestracja"}/>
                        :
                        <div className={"div-avatar"}>
                            <img src={avatar} className={"avatar rounded-2xl"} height={"50px"} width={"50px"}/>
                        </div>
                    }
                </div>
            </nav>

        );
    }
}
