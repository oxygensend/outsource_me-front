import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SERVER_URL } from "../../config";
import { HomeImage } from "../../components/WelcomeBoard/HomeImage";
import authService from "../../services/authService";

export const EmailVerification = () => {

    const  [searchParams, setSearchParams] = useSearchParams();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
       const token =  searchParams.get("token");
       console.log(token)

       authService.verifyEmail({token: token}).then(res => {
        if(res.status === 200){
            console.log(res);
            setVerified(true);
        }  
      })

    });


    if(verified){
        return (
            <div className={'home h-full'}>
                    <HomeImage/>
                    <div className={'right-content justify-center'}>
                        <div className= {'login-content'}>
                        <h2>Adress email został potwierdzony</h2>
                        <a href='/logowanie' className={'text-blue-600  hover:text-blue-400 underline'}> Zaloguj się</a>
                        </div>
                    </div>
            </div>
        )
    } else {
        return (
            <div className={'home h-full'}>

            </div>
        )

    }
}