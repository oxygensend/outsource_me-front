import React from "react";
import add_icon from '../../assets/icons/AddIcon.png';

export const Dropbox = ({inputRef, handleChange, dragActive, handleDrag, handleDrop}) => {

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div>
            <input ref={inputRef} type="file" className={"input-file-upload"} multiple={true} onChange={handleChange}/>
            <label htmlFor="input-file-upload" className={"label-file-upload " + (dragActive ? "drag-active" : "")}>
                <div>
                    <p>Przeciągnij i upuść plik tutaj lub wybierz pliki</p>
                    <img src={add_icon} className="upload-button relative mt-1 left-1/2 transform -translate-x-1/2"
                         onClick={onButtonClick}/>

                </div>
            </label>
            {dragActive && <div
                className={"drag-file-element"}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}></div>
            }
        </div>
    );
}