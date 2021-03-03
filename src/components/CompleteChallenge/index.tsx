import { useContext } from 'react';
import { ChallengeContext } from '../../contexts/ChallengeContext';
import style from '../../styles/components/CompleteChallenge.module.scss';

const CompleteChallenge = () => {
    const { challengesComplete } = useContext(ChallengeContext);

    return (
        <div className={style.completeChallangeContainer}> 
            <span>Desafios completos</span>
            <span>{ challengesComplete }</span>
        </div>
    )
}

export default CompleteChallenge;