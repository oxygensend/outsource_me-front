export const CheckboxOption = (props) => {
    return (
        <div className={'type-option'} onClick={props.onClick}>
            <div className={'checkbox-option ' + (props.active ? 'checkbox-active' : null)}></div>
            <p>{props.name}</p>
        </div>
    );
};
