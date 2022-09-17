import './Buton.css';

export const Button = (props) => {


    return (
        <div className={props.class ?? "button button-mobile"}>
            <p className={"button-text"} style={{color: props.text_color ?? "#ffffff"}}> {props.value}</p>
        </div>
    );
}