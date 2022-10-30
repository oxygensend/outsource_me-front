import React from "react";
export const Select = ({options, register, label, name}) => {
    return (
        <div className={"flex flex-col mt-2"}>
            <label className={"input-label"}>{label}</label>
            <select  name={name} className={"select"} {...register(name)}>
                {options.map((el, i) => {
                    return (
                        <option  key={i} value={el['@id']}>{el.name}</option>
                    )

                })}
            </select>
        </div>
    );
}