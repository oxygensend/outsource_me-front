import './Input.css'

export const Textarea = ({label, name, placeholder, type, required, onChange, register, error}) => {
    return (
        <div className={"mt-2"}>
            <label className={"input-label"}>{label}</label>
            <textarea
                className={"textarea"}
                name={name}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                {...register(name, {required})}
            />

            {error ?
                <span
                    className={"flex mb-0.5 font-medium tracking-wide ml-1 text-red-500 text-xs flex order-2 relative bottom-2 "}>
                   {error.message ?? error}
                </span> : null
            }

        </div>
    );
}