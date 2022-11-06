import './Input.css'

export const Input = (props) => {
    return (
        <div className={ props.className ?? `input-field ${props.class ?? null } ${ (props.error ? ' mb-10' : null)} ${props.position ?? ' center-input'}` }>
            <label className={"input-label"}>{props.label}</label>
            <input
                className={"input "}
                name={props.name}
                placeholder={props.placeholder}
                type={props.type}
                required={props.required}
                onChange={props.onChange}
            />

            {props.error ?
                <span
                    className={"flex mb-0.5 font-medium tracking-wide ml-1 text-red-500 text-xs flex order-2 relative bottom-2 "}>
                   {props.error.message ?? props.error}
                </span> : null
            }

        </div>
    );
}