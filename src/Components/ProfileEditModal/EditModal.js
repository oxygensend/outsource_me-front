import close_icon from "../../assets/icons/close-icon.svg";
import {useParams} from "react-router-dom";

export const EditModal = ({title, children, onSubmitHandler, errors}) => {
    const {id} = useParams();

    const onClickCloseButton = () => {
        window.location.href = '/profil/' + id;
    }

    return (
        <div
            className={"z-50 order-10 bg-amber-600 fixed top-40 left-1/2 transform -translate-x-1/2 edit"}>
            <p className={"text-xl pb-2 pl-1 mb-2"}>{title}</p>

            {children}
            {errors   ?
                <span
                    className={"flex mb-0.5 font-medium tracking-wide ml-1 text-red-500 text-xs flex order-2 relative bottom-2 "}>
                    Posiadasz już jedną z wybranych technologii
                </span> : null

            }

            <img
                src={close_icon}
                alt={"close icon"}
                className={"rounded-2xl cursor-pointer absolute right-0 top-0 ml-1 mb-1"}
                width={19}
                height={19}
                style={{background: "rgba(128, 128, 128, 0.21)"}}
                onClick={() => onClickCloseButton()}
            />

        </div>
    );
}