import './Buton.css';
import { Link } from 'react-router-dom';

export const ButtonLink = (props) => {
    return (
        <div className={props.class ?? 'button button-mobile'}>
            <Link
                className={'button-text'}
                style={{ color: props.text_color ?? '#ffffff' }}
                to={props.route}
                state={props.state}
                children={props.value}
            />
        </div>
    );
};
