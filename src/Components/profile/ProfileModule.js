import edit_icon from "../../assets/icons/edit-icon.png";
import plus from "../../assets/icons/plus.png";
import '../../pages/profile/index.css'

export const ProfileModule = (props) => {
    return (

        <div className={"col-span-full mt-5 grid grid-cols-10 " } >

            <div className={"col-start-2 col-end-10 md:col-end-" + (props.lastCol ?? '10')}>
                <p className={"font-module pb-2"}>{props.title}</p>
                {props.children}

            </div>
            <div className={"col-end-11  row-span-0 cursor-pointer"}>
                <img src={plus} alt={"add"} onClick={props.addAction}/>
                <img src={edit_icon} alt={"edit"} className={"mt-2"} onClick={props.editAction}/>
            </div>
            {props.breakLine ?
                <hr className={"col-span-full mt-10 "} style={{backgroundColor: "#0F528B", opacity: "0.8"}}/>
                : null
            }
        </div>
    );
}