import { Children, createContext, useState, ReactNode, useContext, useCallback, useEffect } from 'react';
import challenges from '../../../challenges.json';
import { ChallengeContext } from '../ChallengeContext';


interface CountDownContextData {
    minutes: number;
    seconds: number;
    hasFinshed: boolean
    isActive: boolean
    stratCoutDown(): void; 
    resetCoutDown(): void; 
}

interface CountDownContextProviderProps{
    children: ReactNode;
}

export const CountDownContext = createContext({} as CountDownContextData);
let countDownTimeout: NodeJS.Timeout;

export const CountDownProvider = ({ children }: CountDownContextProviderProps) => {

    const { startNewChallenge } = useContext(ChallengeContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinshed, setHasFinshed] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    useEffect(() => {
        if(isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }else if(isActive && time === 0) {
            setHasFinshed(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    const stratCoutDown = useCallback(() => {
        setIsActive(true);
    }, []);

    const resetCoutDown = useCallback(() => {
        setIsActive(false);
        clearTimeout(countDownTimeout);
        setTime(25 * 60);
        setHasFinshed(false);
    }, []);

  return (
    <CountDownContext.Provider value={{
        minutes,
        seconds,
        hasFinshed,
        isActive,
        stratCoutDown,
        resetCoutDown,
    }}>
        {children}
    </CountDownContext.Provider>
  )
}
