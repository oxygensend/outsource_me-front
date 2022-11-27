import React from "react";
import {Controller} from "react-hook-form";
import {Editor} from "draft-js";

const RichText = ({control, placeholder, name='DraftJS'}) => {

    return (
        <div
        >
            <Controller
                name={name}
                control={control}
                render={({field: {value, onChange}}) => {
                    return <Editor placeholder={placeholder} editorState={value} onChange={onChange}/>;
                }}
            />
        </div>
    );
}

export default RichText;