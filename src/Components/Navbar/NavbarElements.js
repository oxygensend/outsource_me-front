import React, {useState} from "react";


export const NavLink = (props) => {

    return (
        <div className={"nav-div "}>
            <a className={"nav-link "} href={props.route}>{props.children}</a>
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
        >
            <a className={"nav-link " + (isHovering ? "hover-text" : "not-hover-text")}
               href={props.route}>
                {props.children}
            </a>
        </div>
    );
}

export const Watermark = (props) => {

    return (
        <div className={"nav-watermark"}>
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
                    route={'/zaloguj-sie'}>
                    Powiadomienia
                </MenuItem
                >
            ) : (
                <MenuItem
                    route={'/zaloguj-sie'}>
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
                <NavLink route={'/zaloguj-sie'}>
                    Powiadomienia
                </NavLink>
            ) : (
                <NavLink route={'/zaloguj-sie'}>
                    Zaloguj się
                </NavLink>
            )
            }</div>
    );
}