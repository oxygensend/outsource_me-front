import close_icon from "../../assets/icons/close-icon.svg";
import {useParams} from "react-router-dom";
import {useEffect, useRef} from "react";

export const ModalWrapper = ({title, children, onSubmitHandler, errors, setShowModals, prop, type, titleCenter}) => {
    const {id} = useParams();
    const modalRef = useRef();
    const modalClass = {'edit': 'edit', 'info': 'info'};

    useEffect(() => {
        const handleCloseModal = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)
            ) {
                onClickCloseButton();
            }
        }

        const handleOnKeyDown = (event) => {
            if (event.keyCode === 27) {
                setTimeout( () => {
                    onClickCloseButton()
                }, 200)
            }
        }

        document.addEventListener('keydown', handleOnKeyDown)
        document.addEventListener('mousedown', handleCloseModal);
        return () => {
            document.removeEventListener('mousedown', handleCloseModal)
            document.removeEventListener('keydown', handleOnKeyDown)
        }

    }, [modalRef]);


    const onClickCloseButton = () => {

        setShowModals((prevState) => ({...prevState, [prop]: false}));
    }

    return (
        <div className={" z-50 order-10 w-full h-full fixed inset-0 bg-gray-600 bg-opacity-50 "}>

            <div
                ref={modalRef}
                className={"fixed top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 overflow-y-auto " + modalClass[type]}>
                <p className={"text-xl pb-2 pl-1 mb-2 " + (titleCenter ? 'text-center' : null)}>{title}</p>

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