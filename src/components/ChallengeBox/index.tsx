import { useContext } from 'react';
import { ChallengeContext } from '../../contexts/ChallengeContext';
import { CountDownContext } from '../../contexts/CountDownContext';

import style from '../../styles/components/ChallengeBox.module.scss'

const ChallengeBox = () => {
    const { aciveChallenges, resetChallenge, completeChallenge } = useContext(ChallengeContext);
    const { resetCoutDown } = useContext(CountDownContext);

    const handlerChallengeSuccesseeded = () => {
        completeChallenge();
        resetCoutDown();
    }

    const handlerChallengeFail = () => {
        resetChallenge();
        resetCoutDown();
    }

    return (
        <div className={style.challengeBoxContainer}>
            { aciveChallenges ? (
                <div className={style.challengeActive}>
                    <header>Ganhe { aciveChallenges.amount } xp</header>
                    <main>
                        <img src={`icons/${aciveChallenges.type}.svg`} alt="" />
                        <strong>Novo desafio</strong>
                        <p>{ aciveChallenges.description }</p>
                    </main>

                    <footer>
                        <button type="button" className={style.challengeFailButton} onClick={handlerChallengeFail}>Falhei</button>
                        <button type="button" className={style.challengeSucceedeButton} onClick={handlerChallengeSuccesseeded}>Completei</button>
                    </footer>
                </div>
            ) : (
                <div className={style.challengeNoActive}>
                    <strong>Finalize um cilco para receberum desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up" />
                        Avance de level completando desafios.
                    </p>
                </div>
            )}
            
        </div>
    )
}

export default ChallengeBox;