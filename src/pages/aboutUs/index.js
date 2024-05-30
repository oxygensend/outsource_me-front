import React, { useEffect, useState } from 'react';
import { getData } from '../../services/utils';
import parse from 'html-react-parser';
import './index.css';

export const AboutUs = () => {
    const [aboutUs, setAboutUs] = useState();

    useEffect(() => {
        return () => {
            getData('/static-data/about-us').then((response) => {
                setAboutUs(response[0]);
            });
        };
    }, []);

    if (aboutUs) {
        return (
            <div className={'profile-container full-height'}>
                <img className={'mainImage'} alt={'image-o-nas'} src={aboutUs.imageUrl} />
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
