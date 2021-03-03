import { useContext } from 'react';
import { CountDownContext } from '../../contexts/CountDownContext';

import style from '../../styles/components/CountDown.module.scss'

const CountDown = () => {
    const {
        minutes,
        seconds,
        hasFinshed,
        isActive,
        stratCoutDown,
        resetCoutDown
    } = useContext(CountDownContext);
    const [minuteLetf, minuteRigth] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRigth] = String(seconds).padStart(2, '0').split('');    
    
    return(
        <div>
            <div className={style.countDownContainer}>
                <div>
                    <span>{minuteLetf}</span>
                    <span>{minuteRigth}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRigth}</span>
                </div>
            </div>

            {hasFinshed ? ( 
                <button 
                    disabled 
                    className={style.countDownButton}
                >
                    Ciclo encerrado             
                </button>
             ) : (
                <>
                    {!isActive && (
                        <button type="button" className={style.countDownButton} onClick={stratCoutDown}>
                            Iniciar ciclo              
                        </button>
                    )}
                    {isActive && (
                        <button type="button" className={`${style.countDownButton} ${style.countDownButtonActive}`} onClick={resetCoutDown}>
                            Abandonar ciclo             
                        </button>
                    )}
                </>
             )}
        </div>
    )
}

export default CountDown;