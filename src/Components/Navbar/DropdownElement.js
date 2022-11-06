import React, {useState} from "react";

export const DropdownElement = ({name, href, onClick, logout}) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }
    return (
        <li
            className={"dropdown-element " + (isHovering ? "hover-text hover" : "not-hover-text not-hover ")}
            onMouseOver={() => handleMouseOver()}
            onMouseOut={() => handleMouseOut()}
            onClick={onClick}
        >
            {logout ?
                <p className={"nav-link cursor-pointer " + (isHovering ? "hover-text" : "not-hover-text ")}
                >{name}</p>
                :
                <a href={href}> {name} </a>
            }
        </li>

    );
}
