export const Checkbox = (props) => {
    return (
        <div className={'checkbox-field ' + (props.class ?? null)}>
            <label className={'checkbox-label'}>{props.label}</label>
            <input
                className={'checkbox'}
                name={props.name}
                placeholder={props.placeholder}
                type={'checkbox'}
                checked={props.checked}
                onChange={props.onChange}
            />
        </div>
    );
};
