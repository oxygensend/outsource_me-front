import React, { useEffect, useState } from 'react';
import { getData } from '../../services/utils';
import parse from 'html-react-parser';
import './index.css';
import { SERVER_URL } from '../../config';

export const AboutUs = () => {
    const [aboutUs, setAboutUs] = useState();

    useEffect(() => {
        return () => {
            getData('/api/about_us?x').then((response) => {
                setAboutUs(response['hydra:member'][0]);
            });
        };
    }, []);

    if (aboutUs) {
        return (
            <div className={'profile-container full-height'}>
                <img className={'mainImage'} alt={'image-o-nas'} src={SERVER_URL + aboutUs.mainImagePath} />
                <div className={'w-full relative'}>
                    <div className={'title'}>
                        <p>{aboutUs.title}</p>
                    </div>
                    <div className={'paragraph'}>{parse(aboutUs.description)}</div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};
