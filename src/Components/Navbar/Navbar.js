import React, {useRef} from "react";
import {useState, useEffect} from 'react';
import './Navbar.css';
import OutsourceMe from '../../assets/images/Outsource me (1).png'
import OutsourceMe_mobile from '../../assets/images/logo-mobile.png'
import menu from '../../assets/images/menu.png'
import {DashboardMenu, MenuItem, NavbarMenu, NavLink, Searchbar, Watermark} from "./NavbarElements";
import {ButtonLink} from "../Button/ButtonLink";
import tokenService from "../../services/tokenService";
import avatar from '../../assets/images/avatar.png';
import {DropdownElement} from "./DropdownElement";
import authService from "../../services/authService";

export const Navbar = (props) => {

    const [showMenu, setShowMenu] = useState(false);
    const isAuthenticated = tokenService.getLocalAccessToken();
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const avatarRef = useRef(null);

    function handleMouseClick() {
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        const handleCloseDropdown = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)
                && avatarRef.current && !avatarRef.current.contains(event.target)
            ) {
                setToggleDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleCloseDropdown);
        return () => {
            document.removeEventListener('mousedown', handleCloseDropdown)
        }

    }, [dropdownRef, avatarRef]);

    return (
        <nav className="navbar">
            <div className={"nav-menu-mobile"} onClick={() => handleMouseClick()}>
                <img src={menu} alt={"menu"}/>
            </div>
            <Watermark
                image={OutsourceMe}
                image_mobile={OutsourceMe_mobile}
                alt={"watermark-outsourceme"}
            />
            {showMenu ?
                <DashboardMenu login={isAuthenticated}/>
                : null}
            <Searchbar/>
            <div className={"nav-menu"}>
                <NavbarMenu login={isAuthenticated}/>
                {!isAuthenticated ?
                    <ButtonLink value={"Dołącz do nas"} route={"/rejestracja"}/>
                    :
                    <div className={"div-avatar cursor-pointer"} ref={avatarRef}>
                        <img
                            alt={"avatar"}
                            src={avatar}
                            className={"avatar rounded-2xl"}
                            height={"50px"}
                            width={"50px"}
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />
                    </div>
                }


            </div>
            {toggleDropdown ?
                <ul className={"user-dropdown cursor-pointer"} ref={dropdownRef}>
                    <DropdownElement
                        key={1}
                        href={"/profil/me"}
                        name={"Wyświetl profil"}
                        onClick={() => setToggleDropdown(false)}
                    />
                    <DropdownElement
                        key={2}
                        href={"/pomoc"}
                        name={"Pomoc"}
                        onClick={() => setToggleDropdown(false)}
                    />
                    <DropdownElement
                        key={3}
                        href={"/profil/me/settings"}
                        name={"Ustawienia"}
                        onClick={() => setToggleDropdown(false)}
                    />
                    <DropdownElement
                        key={4}
                        logout={true}
                        name={"Wyloguj się"}
                        onClick={() => {
                            authService.logout();
                            setToggleDropdown(false)
                        }}
                    />
                </ul>
                : null
            }
        </nav>

    );
}
