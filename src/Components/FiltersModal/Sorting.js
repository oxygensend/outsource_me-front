import {CheckboxOption} from "./CheckboxOption";

export const Sorting = ({options, onFilterClick, selectedOption}) => {

    return (
        <div>
            {options.map((option, i) => {
                return (
                    <CheckboxOption
                        key={i}
                        name={option.placeholder}
                        onClick={() => { onFilterClick('order', option.name)}}
                        active={selectedOption === option.name}
                    />);
            })}


        </div>
    );
}