import google from '../../assets/Google Logo.png';
import './Buton.css';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_URL } from '../../config';

export const GoogleButton = (props) => {
    const redirectToGoogle = () => {
        window.location.href = GOOGLE_URL;
    };

    return (
        <div className={'button-google cursor-pointer'} onClick={redirectToGoogle}>
            <img className={'cursor-pointer'} src={google} alt={'google'} />
            <p className={'cursor-pointer'}> {props.children}</p>
        </div>
    );
};
