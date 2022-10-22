import './Buton.css';

export const ButtonLink = (props) => {


    return (
        <div className={props.class ?? "button button-mobile"}>
            <a className={"button-text"} style={{color: props.text_color ?? "#ffffff"}} href={props.route}> {props.value}</a>
        </div>
    );
}