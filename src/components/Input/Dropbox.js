import React from 'react';
import add_icon from '../../assets/icons/AddIcon.png';
import close_icon from '../../assets/icons/trashcan.png';
import { deleteElementFromArray } from '../../services/utils';

export const Dropbox = ({ inputRef, handleChange, dragActive, handleDrag, handleDrop, files, setFiles }) => {
    const onButtonClick = () => {
        inputRef.current.click();
    };

    const removeFile = (file) => {
        const processedFiles = deleteElementFromArray(files, file);
        setFiles(processedFiles);
    };

    return (
        <div>
            <input ref={inputRef} type='file' className={'input-file-upload'} multiple={true} onChange={handleChange} />
            <label htmlFor='input-file-upload' className={'label-file-upload ' + (dragActive ? 'drag-active' : '')}>
                <div className={'mt-2'}>
                    <p>Przeciągnij i upuść plik tutaj lub wybierz pliki</p>
                    <img
                        src={add_icon}
                        className='upload-button relative mt-1 left-1/2 transform -translate-x-1/2'
                        onClick={onButtonClick}
                    />

                    <div className={'text-center text-xs italic mb-2 mt-2'}>
                        {files
                            ? files.map((file, i) => {
                                  return (
                                      <div key={i} className={'flex justify-between'}>
                                          <p>{file.name}</p>
                                          <img
                                              src={close_icon}
                                              className={'mb-1 mt-1 cursor-pointer'}
                                              alt={'delete'}
                                              width={18}
                                              onClick={() => removeFile(file)}
                                          />
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                </div>
            </label>
            {dragActive && (
                <div
                    className={'drag-file-element'}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                ></div>
            )}
        </div>
    );
};
