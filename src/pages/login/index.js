import './index.css';
import '../../components/WelcomeBoard/WelcomeBoard.css';
import React from 'react';
import { LoginForm } from '../../components/Forms/LoginForm';
import { HomeImage } from '../../components/WelcomeBoard/HomeImage';

export class Login extends React.Component {
    render() {
        return (
            <div className={'home h-full'}>
                <HomeImage />
                <div className={'right-content justify-center'}>
                    <LoginForm />
                </div>
            </div>
        );
    }
}
