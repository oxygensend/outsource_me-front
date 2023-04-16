import './Input.css';

export const InputProfile = ({ label, name, placeholder, type, required, onChange, register, error, step }) => {
    return (
        <div className={'mt-2'}>
            <label className={'input-label'}>{label}</label>
            <input
                className={'input-profile'}
                name={name}
                placeholder={placeholder}
                type={type}
                step={step}
                required={required}
                onChange={onChange}
                {...register(name, { required })}
            />

            {error ? (
                <span className={'font-medium tracking-wide ml-1 text-red-500 text-xs relative bottom-1 '}>
                    {error.message ?? error}
                </span>
            ) : null}
        </div>
    );
};
