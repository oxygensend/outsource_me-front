import './Buton.css';

export const Button = (props) => {


    return (
        <div className={props.class ?? "button button-mobile"}>
            <input className={"button-text cursor-pointer"} style={{color: props.text_color ?? "#ffffff"}} type={"submit"} value={props.value}/>
        </div>
    );
}