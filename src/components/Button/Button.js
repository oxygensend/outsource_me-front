import './Buton.css';

export const Button = ({className, text_color, value, onClick}) => {

    return (
        <div className={className ?? "button button-mobile"} onClick={onClick}>
            <button className={"button-text cursor-pointer"} style={{color: text_color ?? "#ffffff"}} type={"submit"}>
                {value}
            </button>
        </div>
    );
}