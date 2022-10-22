import React, {useState} from "react";
import AuthService from "../../services/authService";


export const NavLink = (props) => {

    return (
        <div className={"nav-div "}>
            <a className={"nav-link "} href={props.route}>{props.children}</a>
        </div>
    );
}

export const Logout = (props) => {

    return (
        <div className={"nav-div "}>
            <p className={"nav-link "} onClick={props.logout}>{props.children}</p>
        </div>
    );
}

export const MenuItem = (props) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }

    return (
        <div className={"nav-div  nav-menu  " + (isHovering ? "hover" : "not-hover")}
             onMouseOver={() => handleMouseOver()}
             onMouseOut={() => handleMouseOut()}
             onClick={props.logout}
        >
            {
                props.logout ?
                    <p className={"nav-link cursor-pointer " + (isHovering ? "hover-text" : "not-hover-text ")}
                    >{props.children}</p>
                    :
                    <a className={"nav-link " + (isHovering ? "hover-text" : "not-hover-text")}
                       href={props.route}>
                        {props.children}
                    </a>
            }
        </div>
    );
}

export const Watermark = (props) => {

    return (
        <div className={"nav-watermark cursor-pointer cur"}>
            <a href={"/"}>
                <picture>
                    <source srcSet={props.image} media="(min-width: 900px)" alt={"watermark"}/>
                    <img src={props.image} alt={"wartermark"}/>
                </picture>
            </a>
        </div>
    );
}

export const Searchbar = (props) => {

    return (
        <div className={"nav-search"}>

            <input className={"nav-search-content "}/>
        </div>
    )
}

export const DashboardMenu = (props) => {

    return (<div className={"nav-dashboard"}>
            {props.login ? (
                <MenuItem
                    route={'/'}
                >
                    Strona główna
                </MenuItem
                >
            ) : (
                <MenuItem
                    route={'/o-nas'}
                >
                    O nas
                </MenuItem
                >
            )
            }
            <MenuItem
                route={'/spolecznosc'}>
                Społeczność
            </MenuItem
            >
            <MenuItem
                route={'/oferty-zlecen'}>
                Oferty zleceń
            </MenuItem
            >
            {props.login ? (
                <MenuItem
                    logout={() => AuthService.logout()}
                >
                    Wyloguj się
                </MenuItem
                >
            ) : (
                <MenuItem
                    route={'/logowanie'}
                >
                    Zaloguj się
                </MenuItem
                >
            )
            }
        </div>
    );
}


export const NavbarMenu = (props) => {
    return (
        <div className={"nav-wrapper"}>
            {props.login ? (
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
            {props.login ? (
                <Logout logout={() => AuthService.logout()}>
                    Wyloguj się
                </Logout>
            ) : (
                <NavLink route={'/logowanie'}>
                    Zaloguj się
                </NavLink>
            )
            }</div>
    );
}