import close_icon from "../../assets/icons/close-icon.svg";
import {useParams} from "react-router-dom";
import {useEffect, useRef} from "react";

export const ModalWrapper = ({title, children, onSubmitHandler, errors, setShowModals, prop}) => {
    const {id} = useParams();
    const modalRef = useRef();

    useEffect(() => {
        const handleCloseDropdown = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)
            ) {
                onClickCloseButton();
            }
        }

        document.addEventListener('mousedown', handleCloseDropdown);
        return () => {
            document.removeEventListener('mousedown', handleCloseDropdown)
        }

    }, [modalRef]);


    const onClickCloseButton = () => {

        setShowModals((prevState) => ({...prevState, [prop]: false}));
    }

    return (
        <div className={" z-50 order-10 w-full h-full fixed inset-0 bg-gray-600 bg-opacity-50 "}>

            <div
                ref={modalRef}
                className={"fixed top-40 left-1/2 transform -translate-x-1/2 overflow-y-auto edit"}>
                <p className={"text-xl pb-2 pl-1 mb-2"}>{title}</p>

                {children}
                {errors ?
                    <span
                        className={"flex mb-0.5 font-medium tracking-wide ml-1 text-red-500 text-xs flex order-2 relative bottom-20 "}>
                    Posiadasz już jedną z wybranych technologii
                </span> : null

                }

                <img
                    src={close_icon}
                    alt={"close icon"}
                    className={"rounded-2xl cursor-pointer absolute right-2 top-2 ml-1 mb-1"}
                    width={19}
                    height={19}
                    style={{background: "rgba(128, 128, 128, 0.21)"}}
                    onClick={() => onClickCloseButton()}
                />

            </div>

        </div>
    );
}