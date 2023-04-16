import './WelcomeBoard.css';

export const HomeContent = (props) => {
    return <div className={'home-content mt-5 sm:mt-0'}>{props.children}</div>;
};
