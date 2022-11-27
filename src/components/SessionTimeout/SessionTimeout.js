import {Fragment, useCallback, useEffect, useRef, useState} from "react";
import tokenService from "../../services/tokenService";
import moment from "moment/moment";
import AuthService from "../../services/authService";

export const SessionTimeout = () => {
    const [events, setEvents] = useState(['click', 'load', 'scroll'])
    const isAuthenticated = tokenService.getLocalAccessToken();

    const warningInactiveInterval = useRef();
    const startTimerInterval = useRef();


    const resetTimer = useCallback(
        () => {
            clearTimeout(startTimerInterval.current);
            clearInterval(warningInactiveInterval.current);

            if (isAuthenticated) {
                let timeStamp = moment();
                sessionStorage.setItem('lastTimeStamp', timeStamp);
            } else {
                clearInterval(warningInactiveInterval.current);
                sessionStorage.removeItem('lastTimeStamp');
            }
            timeChecker();
        },
        [isAuthenticated],
    );

    const timeChecker = () => {
        startTimerInterval.current = setTimeout(() => {
            let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
            warningInactive(storedTimeStamp);
        }, 900000);
    };

    useEffect(() => {
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        })

        timeChecker();

        return () => {
            clearTimeout(startTimerInterval.current);
        };
    }, [resetTimer, events, timeChecker])


    const warningInactive = (timeString) => {
        clearTimeout(startTimerInterval.current);

        warningInactiveInterval.current = setInterval(() => {
            const maxTime = 15; // Maximum ideal time given before logout

            const diff = moment.duration(moment().diff(moment(timeString)));
            const minPast = diff.minutes();


            if (minPast === maxTime) {
                clearInterval(warningInactiveInterval.current);
                sessionStorage.removeItem('lastTimeStamp');
                AuthService.logout();
            }
        }, 1000);
    };


    return <Fragment/>
}