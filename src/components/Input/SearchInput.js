import { Search } from '../Search/Search';
import React from 'react';
import close_icon from '../../assets/icons/close-icon.svg';

export const SearchInput = ({
    label,
    search,
    onChangeHandler,
    error,
    onSearchedElementClick,
    results,
    selected,
    onClickClearButton,
    placeholder,
}) => {
    return (
        <>
            <label className={'input-label'}>{label}</label>

            <img
                src={close_icon}
                alt={'close icon'}
                className={
                    'bg-red-400 rounded-2xl  flex relative top-2 right-1 cursor-pointer ' + (!selected ? 'hidden' : '')
                }
                width={15}
                height={15}
                style={{ background: '#D82521' }}
                onClick={() => onClickClearButton()}
            />

            <Search search={search} onChangeHandler={onChangeHandler} placeholder={placeholder} error={error} />

            <ul className={'search-results' + (results.length > 1 ? 'block' : 'hidden')}>
                {results.map((university, i) => {
                    return (
                        <li
                            key={i}
                            className={'border-b-2 border-gray-100 cursor-pointer hover:bg-gray-100 p-1'}
                            style={{ opacity: '0.7' }}
                            onClick={() => onSearchedElementClick(university)}
                        >
                            {university.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
