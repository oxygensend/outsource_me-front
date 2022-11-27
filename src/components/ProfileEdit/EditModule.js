import {useParams} from "react-router-dom";
import tokenService from "../../services/tokenService";
import plus from "../../assets/icons/plus.png";
import edit_icon from "../../assets/icons/edit-icon.png";

export const EditModule = ({title, children, lastCol,breakLine}) => {
    const {id} = useParams();

    return (

        <div className={"col-span-full mt-5 grid grid-cols-10 "}>

            <div className={"col-start-2 col-end-10 md:col-end-" + (lastCol ?? '10')}>
                <p className={"font-module pb-2"}>{title}</p>
                {children}

            </div>
            {tokenService.checkIfMe(id) ?
                <div className={"col-end-11  row-span-0 cursor-pointer"}>
                </div>
                : null}
            {
                breakLine ?
                    <hr className={"col-span-full mt-10 "} style={{backgroundColor: "#0F528B", opacity: "0.8"}}/>
                    : null
            }
        </div>
    );
}