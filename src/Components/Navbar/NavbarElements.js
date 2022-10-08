
export const  NavLink = (props) => {

    return (
        <div className={"nav-div"}>
            <a className={"nav-link"} href={props.route}>{props.children}</a>
        </div>
    );
}

export const Watermark = (props) => {

    return (
        <div className={"nav-watermark nav-watermark-mobile"}>
            <a href={"/"}>
                <picture>
                    <source srcSet={props.image} media="(min-width: 900px)" alt={"watermark"}/>
                    <source srcSet={props.image_menu} media="(min-width: 320px)" alt={"watermark"}/>
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