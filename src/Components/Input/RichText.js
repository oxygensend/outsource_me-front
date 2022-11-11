import React from "react";
import {Controller} from "react-hook-form";
import {Editor} from "draft-js";

const RichText = ({control, placeholder}) => {

    return (
        <div
        >
            <Controller
                name="DraftJS"
                control={control}
                render={({field: {value, onChange}}) => {
                    return <Editor placeholder={placeholder} editorState={value} onChange={onChange}/>;
                }}
            />
        </div>
    );
}

export default RichText;