import { CheckboxOption } from './CheckboxOption';

export const WhatYouLookinFor = ({ principles, developers, onFilterClick }) => {
    const onClick = (developers, principles) => {
        onFilterClick('principles', !principles);
        onFilterClick('developers', !developers);
        onFilterClick('page', 0)
    };
    return (
        <div>
            <CheckboxOption
                name={'Zlecenia'}
                onClick={() => {
                    onClick(developers, principles);
                }}
                active={principles}
            />
            <CheckboxOption
                name={'Programiści'}
                onClick={() => {
                    onClick(developers, principles);
                }}
                active={developers}
            />
        </div>
    );
};
