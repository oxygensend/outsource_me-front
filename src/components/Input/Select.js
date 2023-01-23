import React from "react";

export const Select = ({options, register, label, name, className, property}) => {
    return (
        <div className={"flex flex-col mt-2"}>
            <label className={"input-label"}>{label}</label>
            <select name={name} className={"select " + className} {...register(name)}>
                {options.map((el, i) => {
                    if (property) {
                        return (
                            <option key={i} value={el}>{el[property]}</option>
                        );
                    } else {
                        return (
                            <option key={i} value={property}>{el}</option>
                        );
                    }
                })}
            </select>
        </div>
    );
}